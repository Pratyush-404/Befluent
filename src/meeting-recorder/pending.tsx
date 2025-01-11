import { IonProgressBar } from '@ionic/react'
import { useEffect, useState } from 'react'

export const Pending = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 0.01)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (progress > 1) {
    setTimeout(() => {
      setProgress(0)
    }, 1000)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div>Processing your audio...</div>
      <IonProgressBar value={progress} style={{ width: '30%' }} />
    </div>
  )
}
