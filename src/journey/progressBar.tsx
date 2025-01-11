import { UserLevel, userLevels } from '../supa-types'
import React from 'react'

import { useUserContext } from '../UserContext'
import { levelColorMapping } from './levelColorMapping'

export const ProgressBar = ({ level }: { level: UserLevel }) => {
  const { user } = useUserContext()
  if (!level) return null
  const isPastLevel =
    userLevels.indexOf(user.level) >= userLevels.indexOf(level)
  return (
    <div>
      <div style={{ textTransform: 'capitalize', fontSize: 12 }}>
        {level} level
      </div>
      <div
        style={{
          width: 123,
          height: 24,
          border: '5px solid var(--ion-color-secondary)',
          backgroundColor: isPastLevel
            ? levelColorMapping[level]
            : 'var(--ion-color-secondary)',
          color: 'white',
          borderRadius: 12,
          textAlign: 'right',
          fontSize: 12,
          paddingRight: 8,
        }}
      >
        {isPastLevel ? '100%' : '0%'}
      </div>
    </div>
  )
}
