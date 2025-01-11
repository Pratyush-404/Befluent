import { createClient } from '@supabase/supabase-js'
import { Database } from './types_db'
const supaProd = createClient<Database>(
  'https://agbdejlfalbotcufcjia.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnYmRlamxmYWxib3RjdWZjamlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY1MjQxNDMsImV4cCI6MjAxMjEwMDE0M30.K07H3-Q7I8tSEltAgEvy0696u8oVSBRdC3kIfKZVqps'
)
// export const supaLocal = createClient<Database>(
//   'http://127.0.0.1:54321',
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
// )
// const useLocal = false
export const supa = supaProd
