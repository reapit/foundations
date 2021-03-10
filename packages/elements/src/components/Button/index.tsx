import * as React from 'react'

export interface ButtonProps {
  type?: 'submit' | 'reset' | 'button'
  variant?: 'primary' | 'secondary' | 'danger' | 'info'
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
      : 'is-danger'

  return (
    <button
      type={type}
      className={`button ${className} ${theme} ${fullWidth ? 'is-fullwidth' : ''} ${loading ? 'is-loading' : ''}`}
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
}
/* JB v2 suggestions
 * the classes `is-centered`, and `has-addons` should be incorporated into the `buttons`
 * class, because they are always added by default anyway
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({ className = '', children }) => {
  return <div className={`is-centered buttons has-addons ${className}`}>{children}</div>
}
