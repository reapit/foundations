import * as React from 'react'
import styles from '@/styles/blocks/diff-checkbox.scss?mod'

export interface DiffCheckboxProps {
  currentChecked: boolean
  changedChecked: boolean
}

const DiffCheckbox = ({ currentChecked, changedChecked }: DiffCheckboxProps) => {
  const changed = currentChecked !== changedChecked

  return (
    <div className={styles.container}>
      <span className={`${styles.checkbox} ${changed ? styles.red : ''}`}>
        <input type="checkbox" checked={currentChecked} readOnly />
      </span>
      {changed && <span className={styles.arrow}>&#8594;</span>}
      {changed && (
        <span className={`${styles.checkbox} ${styles.green}`}>
          <input type="checkbox" checked={changedChecked} readOnly />
        </span>
      )}
    </div>
  )
}

export default DiffCheckbox
