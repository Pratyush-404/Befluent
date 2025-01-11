export const CircularProgressBar = ({
  total,
  remaining,
  color = 'primary',
}: {
  total: number
  remaining: number
  color?: string
}) => {
  const radius = 27
  const circumference = 2 * Math.PI * radius
  const progress = ((total - remaining) / total) * circumference

  return (
    <svg height="100" width="100">
      <circle
        stroke={`var(--ion-color-${color})`}
        fill="transparent"
        strokeWidth="5"
        strokeDasharray={circumference}
        style={{ strokeDashoffset: progress }}
        r={radius}
        cx="50"
        cy="50"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        stroke={`var(--ion-color-${color})`}
        strokeWidth="1px"
        fill={`var(--ion-color-${color})`}
        fontSize="20"
      >
        {remaining}
      </text>
    </svg>
  )
}
