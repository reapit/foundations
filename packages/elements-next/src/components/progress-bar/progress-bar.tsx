import React from 'react'
import { elProgress } from './styles'

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

  return <progress className={elProgress} value={validPercentage} max="100"></progress>
}

ProgressBar.displayName = 'ProgressBar'

export default ProgressBar
