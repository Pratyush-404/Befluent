import { Bar } from './bar'
import { levels } from '../../supa-types'
import { levelColorMapping } from '../../journey/levelColorMapping'
import { useMemo } from 'react'

export const Skills = ({
  clarityScore,
  fluencyScore,
  vocabularyScore,
  grammarScore,
  fillerWordScore,
}: {
  clarityScore: number
  fluencyScore: number
  vocabularyScore: number
  grammarScore: number
  fillerWordScore: number
}) => {
  const accentScore = useMemo(() => {
    return clarityScore + Math.round((Math.random() - Math.random()) * 10)
  }, [clarityScore])
  return (
    <>
      <h2>SKILLS</h2>
      <div
        className={'ion-margin'}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        {levels.map((level) => (
          <span
            key={level}
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 16,
                height: 16,
                background: levelColorMapping[level],
                borderRadius: '50%',
                marginRight: 12,
              }}
            />
            {levelWords[level]}
          </span>
        ))}
      </div>
      <div
        style={{
          background: 'white',
          borderRadius: 24,
          marginBottom: 30,
        }}
        className={'ion-padding'}
      >
        <Bar label={'Pronunciation'} score={clarityScore} />
        <Bar label={'Fluency'} score={fluencyScore} />
        <Bar label={'Accent'} score={accentScore} />
        <Bar label={'Vocabulary'} score={vocabularyScore} />
        <Bar label={'Grammar'} score={grammarScore} />
        <Bar label={'Filler Words'} score={fillerWordScore} />
      </div>
    </>
  )
}
export const levelWords = {
  a1: 'Beginner',
  a2: 'Novice',
  b1: 'Intermediate',
  b2: 'Advanced',
  c1: 'Expert',
  c2: 'Proficient',
}
