import React, { ChangeEvent } from 'react'
import { cx } from 'linaria'
import { elCheckbox } from './styles'

export interface CheckboxProps {
  name: string
  value: boolean | string
  id?: string
  label?: string
  className?: string
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  label,
  className,
  value = false,
  disabled = false,
  onChange,
}) => {
  return (
    <div className={cx(elCheckbox, className)}>
      <input
        disabled={disabled}
        type="checkbox"
        name={name}
        id={id}
        checked={onChange && !!value}
        onChange={onChange}
      />
      {!!label && <label htmlFor={id}>{label}</label>}
    </div>
  )
}

export default Checkbox
