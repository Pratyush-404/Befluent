import { Database } from '../types_db'

export type UserLevel = Database['public']['Tables']['users']['Row']['level']
export const userLevels: UserLevel[] = [
  null,
  'a1',
  'a2',
  'b1',
  'b2',
  'c1',
  'c2',
]
export const levels = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'] as const
export type Level = (typeof levels)[number]

export type ExerciseTemplate =
  Database['public']['Tables']['exercise_templates']['Row']
export type Challenge_Enum = Database['public']['Enums']['challenge_enum']
