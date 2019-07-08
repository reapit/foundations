import * as React from 'react'
import bulma from '@/styles/vendor/bulma'

export interface ButtonProps {
  type: 'submit' | 'reset'
  variant: 'primary' | 'secondary' | 'danger'
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  isFullWidth?: boolean
  dataTest?: string
}

const { button, isMedium, isPrimary, isSecondary, isLoading, isRounded, isDanger, isFullwidth } = bulma
export const buttonBase = `${button} ${isMedium} ${isRounded}`
export const buttonPrimary = `${buttonBase} ${isPrimary}`
export const buttonSecondary = `${buttonBase} ${isSecondary}`
export const buttonDanger = `${buttonBase} ${isDanger}`

const Button: React.SFC<ButtonProps> = ({
  type,
  variant,
  disabled = false,
  loading = false,
  children,
  isFullWidth = false,
  onClick,
  dataTest = ''
}) => {
  const className = variant === 'primary' ? buttonPrimary : variant === 'secondary' ? buttonSecondary : buttonDanger

  return (
    <button
      type={type}
      className={`${className} ${isFullWidth ? isFullwidth : ''} ${loading ? isLoading : ''}`}
      disabled={disabled}
      onClick={onClick}
      data-test={dataTest}
    >
      {children}
    </button>
  )
}

export default Button
