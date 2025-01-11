import { ReactNode } from 'react'

export const Level0 = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin={'anonymous'}
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap"
        rel="stylesheet"
      />
      <div
        aria-label={'left'}
        style={{
          width: '76%',
          background: '#F4F7FC',
          overflow: 'auto',
        }}
        className={'ion-padding'}
      >
        <h1 className={'ion-text-start'}>REPORT CARD</h1>
        <p>
          Date:{' '}
          <span
            style={{
              color: 'var(--ion-color-primary)',
            }}
          >
            {new Date().toDateString()}
          </span>
        </p>
        {children}
      </div>
    </>
  )
}
