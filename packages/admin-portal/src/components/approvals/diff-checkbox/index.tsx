import React from 'react'
import { cx } from '@linaria/core'
import { checkboxContainer, checkboxWrap, greenBackground, redBackground, arow } from './__styles__'

export interface DiffCheckboxProps {
  currentChecked: boolean
  changedChecked: boolean
  dataTest?: string
}

export const DiffCheckbox = ({ currentChecked, changedChecked, dataTest }: DiffCheckboxProps) => {
  const changed = currentChecked !== changedChecked

  return (
    <div className={checkboxContainer} data-test={dataTest || ''}>
      <span className={cx(checkboxWrap, changed && redBackground)}>
        <input type="checkbox" checked={currentChecked} readOnly data-test="current" />
      </span>
      {changed && <span className={arow}>&#8594;</span>}
      {changed && (
        <span className={cx(checkboxWrap, greenBackground)}>
          <input type="checkbox" checked={changedChecked} readOnly data-test="changed" />
        </span>
      )}
    </div>
  )
}

export default DiffCheckbox
