import { Level, userLevels } from '../../supa-types'
import { levelColorMapping } from '../../journey/levelColorMapping'
import { Explainer } from './explainer'
import ribbon from './ribbon.png'

export const LevelBlock = ({
  level,
  userLevel,
  userLevelExplanation,
}: {
  level: Level
  userLevel: Level
  userLevelExplanation: string
}) => {
  const isPastLevel = userLevels.indexOf(userLevel) >= userLevels.indexOf(level)
  const isCurrentLevel = userLevel === level
  return (
    <div
      style={{
        width: '16%',
      }}
    >
      <span
        aria-label={'box'}
        style={{
          background: `rgba(${parseInt(
            levelColorMapping[level].slice(1, 3),
            16
          )}, ${parseInt(levelColorMapping[level].slice(3, 5), 16)}, ${parseInt(
            levelColorMapping[level].slice(5, 7),
            16
          )}, 0.4)`,
          textTransform: 'uppercase',
          display: 'inline-flex',
          width: 27,
          height: 26,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 4,
          marginBottom: 10,
        }}
      >
        {level}
      </span>
      {level === 'c2' ? (
        <div style={{ marginLeft: -8 }}>
          <img src={ribbon} width={48} alt={'ribbon'} />
        </div>
      ) : (
        <div
          aria-label={'bar'}
          style={{
            background: isPastLevel ? levelColorMapping[level] : 'white',
            width: '100%',
            height: 8,
            borderRadius: 2,
            marginTop: 20,
          }}
        />
      )}
      {isCurrentLevel && (
        <>
          <div
            style={{
              background: 'var(--ion-color-primary)',
              color: 'white',
              padding: 12,
              borderRadius: 10,
              marginTop: 10,
              width: 'fit-content',
            }}
          >
            You're Here
          </div>
          <Explainer id={'user-level'} content={userLevelExplanation} />
        </>
      )}
    </div>
  )
}
