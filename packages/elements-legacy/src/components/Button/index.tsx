import { cx } from '@linaria/core'
import * as React from 'react'

export interface ButtonProps {
  type?: 'submit' | 'reset' | 'button'
  variant?: 'primary' | 'secondary' | 'danger' | 'info' | 'success'
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  className?: string
  dataTest?: string
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  loading = false,
  children,
  fullWidth = false,
  onClick,
  dataTest = '',
}) => {
  const theme =
    variant === 'primary'
      ? 'is-primary'
      : variant === 'secondary'
      ? 'is-secondary'
      : variant === 'info'
      ? 'is-info'
      : variant === 'success'
      ? 'is-success'
      : 'is-danger'

  return (
    <button
      type={type}
      className={`button ${fullWidth ? 'is-fullwidth' : ''} ${loading ? 'is-loading' : ''} ${theme} ${className}`}
      disabled={disabled}
      onClick={onClick}
      data-test={dataTest}
    >
      {children}
    </button>
  )
}

export interface ButtonGroupProps {
  className?: string
  hasSpacing?: boolean
  isCentered?: boolean
}
/* JB v2 suggestions
 * the classes `is-centered`, and `has-addons` should be incorporated into the `buttons`
 * class, because they are always added by default anyway
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  className = '',
  hasSpacing = false,
  isCentered = false,
  children,
}) => {
  return (
    <div className={cx('is-centered buttons', !hasSpacing && 'has-addons', isCentered && 'mx-auto', className)}>
      {children}
    </div>
  )
}
