import React from 'react'
import styles from '@/styles/ui/progressbar.scss?mod'

export const Filler: React.FC<ProgressBarProps> = props => {
  return <div className={styles.filler} style={{ width: `${props.percentage}%` }} />
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
    <div className={styles.progressBar}>
      <Filler percentage={validPercentage} />
    </div>
  )
}

ProgressBar.displayName = 'ProgressBar'

export default ProgressBar
