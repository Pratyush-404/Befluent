
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE TYPE "public"."challenge" AS ENUM (
    'It''s hard to find time',
    'It''s hard to stay motivated',
    'Lack of opportunities to speak',
    'Remembering what I learned',
    'I''m too nervous to speak',
    'English language is too hard'
);

ALTER TYPE "public"."challenge" OWNER TO "postgres";

CREATE TYPE "public"."exercise_type" AS ENUM (
    'Enhancing Reading Skill of Ability',
    'Enhancing Reading Skill of Association'
);

ALTER TYPE "public"."exercise_type" OWNER TO "postgres";

CREATE TYPE "public"."gender" AS ENUM (
    'male',
    'female'
);

ALTER TYPE "public"."gender" OWNER TO "postgres";

CREATE TYPE "public"."goals" AS ENUM (
    'Travel or live abroad',
    'Accelerate my career',
    'Talk to foreigners',
    'Self improvement',
    'Speak English with friends and family',
    'Other'
);

ALTER TYPE "public"."goals" OWNER TO "postgres";

CREATE TYPE "public"."level" AS ENUM (
    'a1',
    'a2',
    'b1',
    'b2',
    'c1',
    'c2'
);

ALTER TYPE "public"."level" OWNER TO "postgres";

CREATE TYPE "public"."native_language" AS ENUM (
    'Arabic',
    'Hindi',
    'Tamil',
    'Telugu',
    'Malayalam',
    'English',
    'Punjabi',
    'Kannada',
    'Urdu',
    'German',
    'French',
    'Spanish',
    'Filipino',
    'Indonesian',
    'Japanese',
    'Russian',
    'Chinese',
    'Portuguese',
    'Polish',
    'Korean',
    'Turkish',
    'Thai',
    'Armenian',
    'Kurdish',
    'Dari',
    'Hebrew',
    'Berber',
    'Kazakh',
    'Pashto',
    'Uzbek',
    'Yiddish',
    'Persian (Farsi)'
);

ALTER TYPE "public"."native_language" OWNER TO "postgres";

CREATE TYPE "public"."pricing_plan_interval" AS ENUM (
    'day',
    'week',
    'month',
    'year'
);

ALTER TYPE "public"."pricing_plan_interval" OWNER TO "postgres";

CREATE TYPE "public"."pricing_type" AS ENUM (
    'one_time',
    'recurring'
);

ALTER TYPE "public"."pricing_type" OWNER TO "postgres";

CREATE TYPE "public"."student_working" AS ENUM (
    'student',
    'working professional'
);

ALTER TYPE "public"."student_working" OWNER TO "postgres";

CREATE TYPE "public"."subscription_status" AS ENUM (
    'trialing',
    'active',
    'canceled',
    'incomplete',
    'incomplete_expired',
    'past_due',
    'unpaid',
    'paused'
);

ALTER TYPE "public"."subscription_status" OWNER TO "postgres";

CREATE TYPE "public"."time_goal" AS ENUM (
    '20',
    '40',
    '60'
);

ALTER TYPE "public"."time_goal" OWNER TO "postgres";

CREATE TYPE "public"."topics" AS ENUM (
    'Business',
    'Travel',
    'Entertainment',
    'Socializing (family and friends)',
    'Culture',
    'Dating',
    'Shopping',
    'Food',
    'Sports'
);

ALTER TYPE "public"."topics" OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.users (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."is_admin"() RETURNS boolean
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    RETURN EXISTS (SELECT 1 FROM public.admins WHERE user_id = auth.uid());
END;
$$;

ALTER FUNCTION "public"."is_admin"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."admins" (
    "user_id" "uuid" NOT NULL
);

ALTER TABLE "public"."admins" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."evaluations" (
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "listen1" boolean,
    "listen2" boolean,
    "listen3" boolean,
    "listen4" boolean,
    "listen5" boolean,
    "listen0" boolean,
    "speak0" "public"."level",
    "speak1" "public"."level"
);

ALTER TABLE "public"."evaluations" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."exercise_templates" (
    "id" bigint NOT NULL,
    "name" "text" DEFAULT ''::"text" NOT NULL,
    "description" "text" DEFAULT ''::"text" NOT NULL
);

ALTER TABLE "public"."exercise_templates" OWNER TO "postgres";

ALTER TABLE "public"."exercise_templates" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."exercise_templates_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."exercises_basic" (
    "id" bigint NOT NULL,
    "content" "text" NOT NULL,
    "question" "text" NOT NULL,
    "options" "text"[] NOT NULL,
    "answer" "text" NOT NULL,
    "explanation" "text" NOT NULL,
    "type" "public"."exercise_type" NOT NULL,
    "level" "public"."level" NOT NULL
);

ALTER TABLE "public"."exercises_basic" OWNER TO "postgres";

ALTER TABLE "public"."exercises_basic" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."exercises_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."logins" (
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "date" timestamp with time zone DEFAULT "now"() NOT NULL
);

ALTER TABLE "public"."logins" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."notifications_seen" (
    "user_id" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "notif_id" smallint NOT NULL
);

ALTER TABLE "public"."notifications_seen" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" NOT NULL,
    "full_name" "text",
    "avatar_url" "text",
    "billing_address" "jsonb",
    "payment_method" "jsonb",
    "goal" "public"."goals",
    "challenge" "public"."challenge",
    "time_goal" "public"."time_goal",
    "gender" "public"."gender",
    "dob" "date",
    "country" "text",
    "city" "text",
    "native_language" "text" DEFAULT 'Arabic'::"text" NOT NULL,
    "student_working" "public"."student_working",
    "level" "public"."level",
    "session_count" smallint DEFAULT '0'::smallint NOT NULL,
    "correct_count" smallint DEFAULT '0'::smallint NOT NULL,
    "incorrect_count" smallint DEFAULT '0'::smallint NOT NULL,
    "read_score" smallint DEFAULT '0'::smallint NOT NULL,
    "write_score" smallint DEFAULT '0'::smallint NOT NULL,
    "listen_score" smallint DEFAULT '0'::smallint NOT NULL,
    "speak_score" smallint DEFAULT '0'::smallint NOT NULL,
    "interests" "text" DEFAULT ''::"text" NOT NULL
);

ALTER TABLE "public"."users" OWNER TO "postgres";

ALTER TABLE ONLY "public"."admins"
    ADD CONSTRAINT "admins_pkey" PRIMARY KEY ("user_id");

ALTER TABLE ONLY "public"."evaluations"
    ADD CONSTRAINT "evaluations_pkey" PRIMARY KEY ("user_id");

ALTER TABLE ONLY "public"."exercise_templates"
    ADD CONSTRAINT "exercise_templates_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."exercises_basic"
    ADD CONSTRAINT "exercises_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."logins"
    ADD CONSTRAINT "logins_pkey" PRIMARY KEY ("user_id", "date");

ALTER TABLE ONLY "public"."notifications_seen"
    ADD CONSTRAINT "notifications_seen_pkey" PRIMARY KEY ("user_id", "notif_id");

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."admins"
    ADD CONSTRAINT "public_admins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id");

ALTER TABLE ONLY "public"."evaluations"
    ADD CONSTRAINT "public_evaluations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."logins"
    ADD CONSTRAINT "public_logins_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."notifications_seen"
    ADD CONSTRAINT "public_notifications_seen_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "public_users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

CREATE POLICY "Can update own user data." ON "public"."users" FOR UPDATE TO "authenticated" USING (("auth"."uid"() = "id")) WITH CHECK (("auth"."uid"() = "id"));

CREATE POLICY "Can view own user data." ON "public"."users" FOR SELECT TO "authenticated" USING (("auth"."uid"() = "id"));

CREATE POLICY "admin" ON "public"."exercises_basic" USING (("auth"."uid"() IN ( SELECT "admins"."user_id"
   FROM "public"."admins")));

ALTER TABLE "public"."admins" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "all" ON "public"."logins" TO "authenticated" USING (("user_id" = "auth"."uid"())) WITH CHECK (("user_id" = "auth"."uid"()));

ALTER TABLE "public"."evaluations" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."exercise_templates" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."exercises_basic" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert" ON "public"."notifications_seen" FOR INSERT WITH CHECK (("user_id" = "auth"."uid"()));

ALTER TABLE "public"."logins" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."notifications_seen" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "read" ON "public"."exercise_templates" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "read" ON "public"."notifications_seen" FOR SELECT USING (("user_id" = "auth"."uid"()));

CREATE POLICY "select" ON "public"."admins" FOR SELECT USING (("auth"."uid"() = "user_id"));

CREATE POLICY "self, all" ON "public"."evaluations" TO "authenticated" USING (("auth"."uid"() = "user_id")) WITH CHECK (("auth"."uid"() = "user_id"));

ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "write" ON "public"."exercise_templates" TO "authenticated" USING ("public"."is_admin"()) WITH CHECK ("public"."is_admin"());

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON FUNCTION "public"."is_admin"() TO "anon";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."is_admin"() TO "service_role";

GRANT ALL ON TABLE "public"."admins" TO "anon";
GRANT ALL ON TABLE "public"."admins" TO "authenticated";
GRANT ALL ON TABLE "public"."admins" TO "service_role";

GRANT ALL ON TABLE "public"."evaluations" TO "anon";
GRANT ALL ON TABLE "public"."evaluations" TO "authenticated";
GRANT ALL ON TABLE "public"."evaluations" TO "service_role";

GRANT ALL ON TABLE "public"."exercise_templates" TO "anon";
GRANT ALL ON TABLE "public"."exercise_templates" TO "authenticated";
GRANT ALL ON TABLE "public"."exercise_templates" TO "service_role";

GRANT ALL ON SEQUENCE "public"."exercise_templates_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."exercise_templates_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."exercise_templates_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."exercises_basic" TO "anon";
GRANT ALL ON TABLE "public"."exercises_basic" TO "authenticated";
GRANT ALL ON TABLE "public"."exercises_basic" TO "service_role";

GRANT ALL ON SEQUENCE "public"."exercises_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."exercises_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."exercises_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."logins" TO "anon";
GRANT ALL ON TABLE "public"."logins" TO "authenticated";
GRANT ALL ON TABLE "public"."logins" TO "service_role";

GRANT ALL ON TABLE "public"."notifications_seen" TO "anon";
GRANT ALL ON TABLE "public"."notifications_seen" TO "authenticated";
GRANT ALL ON TABLE "public"."notifications_seen" TO "service_role";

GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
