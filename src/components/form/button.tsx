import * as React from 'react'
import bulma from '@/styles/vendor/bulma'

export interface ButtonProps {
  type: 'submit' | 'reset' | 'button'
  variant: 'primary' | 'secondary' | 'danger'
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  className?: string
  dataTest?: string
}

const { button, isPrimary, isSecondary, isLoading, isDanger, isFullwidth } = bulma
export const buttonBase = `${button}`
export const buttonPrimary = `${buttonBase} ${isPrimary}`
export const buttonSecondary = `${buttonBase} ${isSecondary}`
export const buttonDanger = `${buttonBase} ${isDanger}`

const Button: React.SFC<ButtonProps> = ({
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
  const theme = variant === 'primary' ? buttonPrimary : variant === 'secondary' ? buttonSecondary : buttonDanger

  return (
    <button
      type={type}
      className={`${theme} ${fullWidth ? isFullwidth : ''} ${loading ? isLoading : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
      data-test={dataTest}
    >
      {children}
    </button>
  )
}

export default Button
