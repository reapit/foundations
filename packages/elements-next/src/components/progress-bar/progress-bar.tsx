import React from 'react'
import { elProgressBar, elProgress } from './styles'

export type ProgressBarProps = {
  percentage: number
}

const MAX = 100
const MIN = 0

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
    <div className={elProgress}>
      <div className={elProgressBar} style={{ width: `${validPercentage}%` }} />
    </div>
  )
}

ProgressBar.displayName = 'ProgressBar'

export default ProgressBar
