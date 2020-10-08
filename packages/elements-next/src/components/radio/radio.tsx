import React, { ChangeEvent } from 'react'
import { cx } from 'linaria'

export interface RadioProps {
  name: string
  id?: string
  label?: string
  className?: string
  value?: string | ReadonlyArray<string> | number
  checked?: boolean
  disabled?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Radio: React.FC<RadioProps> = ({ id, name, label, className, value, checked, disabled, onChange }) => {
  return (
    <div className={cx(className)}>
      <input id={id} type="radio" checked={checked} name={name} value={value} disabled={disabled} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}

export default Radio
