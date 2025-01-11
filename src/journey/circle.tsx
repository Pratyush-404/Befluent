import React from 'react'

import { levelColorMapping } from './levelColorMapping'

export function Circle(props: {
  level: 'a1' | 'a2' | 'b1' | 'b2' | 'c1' | 'c2'
}) {
  return (
    <div
      aria-label={props.level + ' circle'}
      style={{
        width: '74px',
        height: '74px',
        textAlign: 'center',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: levelColorMapping[props.level],
        fontSize: 20,
        color: 'white',
        textTransform: 'uppercase',
        margin: 20,
      }}
    >
      {props.level}
    </div>
  )
}
