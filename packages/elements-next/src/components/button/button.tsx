import React from 'react'
import { cx } from 'linaria'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'info'
  isLoading?: boolean
  isFullWidth?: boolean
  onClick?: () => void
  className?: string
  dataTest?: string
}

export const Button: React.SFC<ButtonProps> = ({
  // props from HTMLButtonElement
  type = 'button',
  disabled = false,
  // custom props
  variant = 'primary',
  isLoading = false,
  isFullWidth = false,
  className,
  children,
  onClick,
  dataTest = '',
}) => {
  const variantClass =
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
      className={`button ${className} ${theme} ${isFullWidth ? 'is-fullwidth' : ''} ${isLoading ? 'is-loading' : ''}`}
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

export default Button
