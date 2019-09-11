import React from 'react'
import { TiTick } from 'react-icons/ti'
import { Button } from '@reapit/elements'
import styles from '@/styles/ui/section.scss?mod'

export const renderCompletedCheckMark = (isCompleted: boolean) => {
  if (!isCompleted) {
    return null
  }
  return (
    <div className={styles.statusSection}>
      <span>
        <TiTick className={styles.checkMark} />
      </span>
      <span>Completed</span>
    </div>
  )
}

export type SectionProps = {
  title: string
  isCompleted: boolean
  onEdit: () => void
  buttonText: string
}

export const Section: React.FC<SectionProps> = ({ title, isCompleted, onEdit, buttonText }) => {
  return (
    <div className={styles.section}>
      <a onClick={onEdit}>{title}</a>
      <div className={styles.checkMarkSection}>
        {renderCompletedCheckMark(isCompleted)}
        <Button onClick={onEdit} type="button" variant="primary">
          {buttonText}
        </Button>
      </div>
    </div>
  )
}

export default Section
