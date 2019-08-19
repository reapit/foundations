import * as React from 'react'
import styles from '@/styles/blocks/diff-checkbox.scss?mod'

export interface DiffCheckboxProps {
  currentChecked: boolean
  changedChecked: boolean
  dataTest?: string
}

const DiffCheckbox = ({ currentChecked, changedChecked, dataTest }: DiffCheckboxProps) => {
  const changed = currentChecked !== changedChecked

  return (
    <div className={styles.container} data-test={dataTest || ''}>
      <span className={`${styles.checkbox} ${changed ? styles.red : ''}`}>
        <input type="checkbox" checked={currentChecked} readOnly data-test="current" />
      </span>
      {changed && <span className={styles.arrow}>&#8594;</span>}
      {changed && (
        <span className={`${styles.checkbox} ${styles.green}`}>
          <input type="checkbox" checked={changedChecked} readOnly data-test="changed" />
        </span>
      )}
    </div>
  )
}

export default DiffCheckbox
