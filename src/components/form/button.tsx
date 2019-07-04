import * as React from 'react'
import bulma from '@/styles/vendor/bulma.scss'

export interface ButtonProps {
  type: 'submit' | 'reset'
  variant: 'primary' | 'secondary'
  disabled: boolean
  loading: boolean
}

export const button = `${bulma['button']} ${bulma['is-medium']} ${bulma['is-rounded']}`
export const buttonPrimary = `${button} ${bulma['is-primary']}`
export const buttonSecondary = `${button} ${bulma['is-secondary']}`
export const loading = ` ${bulma['is-loading']}`

const Button: React.SFC<ButtonProps> = ({ type, variant, disabled, loading, children }) => {
  const className = variant === 'primary' ? buttonPrimary : buttonSecondary

  return (
    <button type={type} className={`${className} ${loading ? 'is-loading' : ''}`} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
