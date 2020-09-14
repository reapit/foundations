import React from 'react'
import { cx } from 'linaria'
import { elCheckbox } from './styles'

interface CheckboxProps {
  name: string
  value: boolean | string
  id?: string
  label?: string
  className?: string
  disabled?: boolean
}

export const Checkbox: React.FC<CheckboxProps> = ({ id, name, label, className, value, disabled = false }) => {
  return (
    <label htmlFor={id} className={cx(elCheckbox, className)}>
      {!!label && label}
      <input id={id} name={name} type="checkbox" checked={!!value} disabled={disabled} />
      <span />
    </label>
  )
}

export default Checkbox
