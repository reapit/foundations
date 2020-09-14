import * as React from 'react'
import { elInput, elInputHasIcon, elInputIcon, elInputErrorText } from './styles'
import { cx } from 'linaria'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'password' | 'email' | 'tel'
  helperText?: React.ReactNode
  rightIcon?: React.ReactNode
  className?: string
  errText?: string
}

export const Input = ({
  type = 'text',
  name,
  rightIcon,
  required = false,
  disabled = false,
  helperText,
  className = '',
  errText,
  value,
  ...props
}: InputProps) => {
  return (
    <div className={cx(className, rightIcon && elInputHasIcon)}>
      <input disabled={disabled} type={type} className={elInput} {...props} />
      {rightIcon && <span className={elInputIcon}>{rightIcon}</span>}
      {helperText && !errText && <p>{helperText}</p>}
      {errText && <p className={cx(elInputErrorText)}>{errText}</p>}
    </div>
  )
}
