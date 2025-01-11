export const advancedExercises = [
  'Spelling',
  'Expression',
  'Eloquence',
  'Concision',
  'Clarity',
  'Diction',
  'Pronunciation',
  'Association',
] as const
export type AdvancedExerciseName = (typeof advancedExercises)[number]
export const advancedExerciseDescriptions: Record<
  AdvancedExerciseName,
  string
> = {
  Spelling: 'Improve your ability to spell words correctly.',
  Expression:
    'Enhance your ability to express thoughts clearly and effectively.',
  Eloquence: 'Develop your fluency and persuasive speaking skills.',
  Concision:
    'Learn to convey information succinctly and without unnecessary detail.',
  Clarity: 'Improve the clarity of your speech and writing.',
  Diction: 'Enhance your choice of words and pronunciation.',
  Pronunciation: 'Practice the correct pronunciation of words.',
  Association:
    'Improve your ability to associate words with their meanings and contexts.',
}
