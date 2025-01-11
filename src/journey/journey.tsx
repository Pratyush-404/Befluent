import cert from './cert.png'
import { userLevels } from '../supa-types'
import { Circle } from './circle'
import { IonContent, IonIcon } from '@ionic/react'
import { flag } from 'ionicons/icons'
import { ProgressBar } from './progressBar'
import React, { useEffect, useRef } from 'react'
import { levelColorMapping } from './levelColorMapping'
import bg from './paths/bg.svg'
import pathA1 from './paths/A1.svg'
import pathA2 from './paths/A2.svg'
import pathB1 from './paths/B1.svg'
import pathB2 from './paths/B2.svg'
import pathC1 from './paths/C1.svg'
import pathC2 from './paths/C2.svg'
import { useUserContext } from '../UserContext'

export const Journey = () => {
  const { user } = useUserContext()
  const levelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const levelRefCurrent = levelRef.current
    if (levelRefCurrent) {
      const to = window.setTimeout(() => {
        levelRefCurrent.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 1000)
      return () => window.clearTimeout(to)
    }
  }, [user.level])

  return (
    <IonContent className="ion-padding">
      <div style={{ position: 'relative' }}>
        <div
          aria-label="paths"
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src={bg}
            alt={'path background'}
            style={{
              position: 'absolute',
              zIndex: -1,
            }}
          />
          <img
            src={paths[user.level || 'a1']}
            alt={'path'}
            style={{
              position: 'absolute',
              zIndex: -1,
              bottom: 38,
            }}
          />
        </div>
        <div
          style={{
            display: 'grid',
            gap: '5px',
            justifyItems: 'center',
          }}
        >
          <img
            src={cert}
            alt={'Certificate'}
            height={72}
            style={{ position: 'relative', bottom: 10, marginRight: 200 }}
          />
          {userLevels
            .map((level, index) => {
              if (!level) return null
              return (
                <div
                  key={index}
                  ref={level === user.level ? levelRef : null}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
                    height: 124,
                  }}
                >
                  <Circle level={level} />
                  <div>
                    <IonIcon
                      icon={flag}
                      size={'large'}
                      style={{ color: levelColorMapping[level] }}
                    />
                    <ProgressBar level={level} />
                  </div>
                </div>
              )
            })
            .reverse()}
          <div
            style={{
              color: levelColorMapping['a1'],
              fontWeight: 500,
              marginLeft: 200,
              textAlign: 'center',
              marginTop: 10,
            }}
          >
            Journey <br /> starts here
          </div>
        </div>
      </div>
    </IonContent>
  )
}
const paths = {
  a1: pathA1,
  a2: pathA2,
  b1: pathB1,
  b2: pathB2,
  c1: pathC1,
  c2: pathC2,
}
