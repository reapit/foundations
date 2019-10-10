import React from 'react'
import { ProgressBar, H3 } from '@reapit/elements'
import styles from '@/styles/ui/aml-progressbar.scss?mod'

export type AMLProgressBarProps = {
  title: string
}

// TODO: will replace when get data from BE
export const calculateProgress = () => {
  return { percentage: 50, completed: 2, total: 7 }
}

export const AMLProgressBar: React.FC<AMLProgressBarProps> = ({ title }) => {
  const progress = calculateProgress()
  return (
    <div>
      <H3>{title}</H3>
      <div className="mb-1">
        <ProgressBar percentage={progress.percentage} />
      </div>
      <div className={styles.progress}>
        {progress.completed}/{progress.total} <span>Completed</span>
      </div>
    </div>
  )
}

export default AMLProgressBar
