import * as React from 'react'

export interface ButtonProps {
  type: 'submit' | 'reset' | 'button'
  variant: 'primary' | 'secondary' | 'danger' | 'info'
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  className?: string
  dataTest?: string
}

export const Button: React.SFC<ButtonProps> = ({
  type,
  variant,
  className = '',
  disabled = false,
  loading = false,
  children,
  fullWidth = false,
  onClick,
  dataTest = ''
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

export const ButtonGroup: React.SFC<{ className?: string }> = ({ className = '', children }) => {
  return <div className={`is-centered buttons has-addons ${className}`}>{children}</div>
}
