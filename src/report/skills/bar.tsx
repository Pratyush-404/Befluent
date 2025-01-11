import { levelColorMapping } from '../../journey/levelColorMapping'
import { levelWords } from './skills'

export const Bar = ({ label, score }: { label: string; score: number }) => {
  const level = (
    score < 50
      ? 'A1'
      : score < 60
      ? 'A2'
      : score < 70
      ? 'B1'
      : score < 80
      ? 'B2'
      : score < 90
      ? 'C1'
      : 'C2'
  ).toLowerCase() as keyof typeof levelColorMapping
  return (
    <div
      style={{
        height: 34,
        background: 'var(--ion-color-secondary)',
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: 700,
        marginBottom: 24,
      }}
    >
      <div
        style={{
          width: score + '%',
          height: '100%',
          background: `linear-gradient(90deg, ${levelColorMapping[level]}ff 0%, ${levelColorMapping[level]}33 100%)`,
          color: 'white',
          display: 'inline-flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          borderRadius: 8,
          whiteSpace: 'nowrap',
        }}
      >
        <span>{label} score</span>
        <span
          style={{
            color: 'black',
            fontWeight: 600,
          }}
        >
          {levelWords[level]}
        </span>
      </div>
      <span
        style={{
          paddingRight: 20,
        }}
      >
        {score} / 100
      </span>
    </div>
  )
}
