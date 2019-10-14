import React from 'react'
import { ProgressBar, H3 } from '@reapit/elements'
import styles from '@/styles/ui/aml-progressbar.scss?mod'
import { SectionsStatus } from '@/reducers/checklist-detail'

export type AMLProgressBarProps = {
  title: string
  status: SectionsStatus
}

// TODO: will replace when get data from BE
export const calculateProgress = (status: SectionsStatus) => {
  const count = Object.keys(status).length
  const completedCount = Object.keys(status).filter(key => status[key]).length
  return { percentage: Math.floor((completedCount / count) * 100), completed: completedCount, total: count }
}

export const AMLProgressBar: React.FC<AMLProgressBarProps> = ({ title, status }) => {
  const progress = calculateProgress(status)
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
