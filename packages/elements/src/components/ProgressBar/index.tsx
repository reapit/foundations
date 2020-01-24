import React from 'react'

export const Filler: React.FC<ProgressBarProps> = props => {
  return <div className="filler" style={{ width: `${props.percentage}%` }} />
}

Filler.displayName = 'Filler'

const MAX = 100
const MIN = 0

export type ProgressBarProps = {
  percentage: number
}

export const ProgressBar: React.FC<ProgressBarProps> = (props: ProgressBarProps) => {
  const { percentage } = props
  let validPercentage = percentage
  if (percentage > MAX) {
    validPercentage = MAX
  }
  if (percentage < MIN) {
    validPercentage = MIN
  }
  return (
    <div className="progress-bar">
      <Filler percentage={validPercentage} />
    </div>
  )
}

ProgressBar.displayName = 'ProgressBar'

export default ProgressBar
