import * as React from 'react'
import bulma from '@/styles/vendor/bulma.scss?mod'

export interface ButtonProps {
  type: 'submit' | 'reset'
  variant: 'primary' | 'secondary'
  disabled: boolean
  loading: boolean
}

export const button = `${bulma.button} ${bulma.isMedium} ${bulma.isRounded}`
export const buttonPrimary = `${button} ${bulma.isPrimary}`
export const buttonSecondary = `${button} ${bulma.isSecondary}`
export const loading = ` ${bulma.isLoading}`

const Button: React.SFC<ButtonProps> = ({ type, variant, disabled, loading, children }) => {
  const className = variant === 'primary' ? buttonPrimary : buttonSecondary

  return (
    <button type={type} className={`${className} ${loading ? 'is-loading' : ''}`} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
