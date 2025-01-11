import { Level, levels } from '../../supa-types'
import { LevelBlock } from './levelBlock'
import { Explanation } from './explanation'

export const Overall = ({
  userLevel,
  userLevelExplanation,
}: {
  userLevel: Level
  userLevelExplanation: string
}) => {
  return (
    <>
      <h2 style={{ display: 'flex', alignItems: 'center' }}>
        OVERALL PROFICIENCY SCORE
        <Explanation />
      </h2>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {levels.map((level) => (
          <LevelBlock
            key={level}
            level={level}
            userLevel={userLevel}
            userLevelExplanation={userLevelExplanation}
          />
        ))}
      </div>
    </>
  )
}
