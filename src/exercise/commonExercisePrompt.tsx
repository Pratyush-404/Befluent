import { User } from '../UserContext'

export const commonExercisePrompt = (
  user: User,
  topic: string,
  topicWord?: string
) =>
  `${
    user.level
      ? `You provide examples for an english skill level of ${user.level}. 
        You provide examples using content relating to ${topic}.
        ${
          topicWord
            ? `You provide examples using this keyword: ${topicWord}`
            : ''
        }.`
      : ''
  }`
