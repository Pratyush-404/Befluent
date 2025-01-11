import { createClient } from '@supabase/supabase-js'
import { Database } from './types_db'
const supaProd = createClient<Database>(
  'https://agbdejlfalbotcufcjia.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnYmRlamxmYWxib3RjdWZjamlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY1MjQxNDMsImV4cCI6MjAxMjEwMDE0M30.K07H3-Q7I8tSEltAgEvy0696u8oVSBRdC3kIfKZVqps'
)
export const supa = supaProd
