import * as React from 'react'
import { cx } from 'linaria'
import { elIntentPrimary, elIntentInfo, elIntentSuccess, elIntentDanger } from '../../styles-v3/base/intent'
import * as styles from './__styles__'

export interface ButtonProps {
  type?: 'submit' | 'reset' | 'button'
  intent?: 'primary' | 'success' | 'danger' | 'info'
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  className?: string
  dataTest?: string
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  intent,
  className = '',
  disabled = false,
  loading = false,
  children,
  fullWidth = false,
  onClick,
  dataTest = '',
}) => {
  let theme = ''
  switch (intent) {
    case 'primary':
      {
        theme = elIntentPrimary
      }
      break
    case 'success':
      {
        theme = elIntentSuccess
      }
      break
    case 'info':
      {
        theme = elIntentInfo
      }
      break
    case 'danger':
      {
        theme = elIntentDanger
      }
      break
  }

  const combinedClassName = cx(
    styles.elButton,
    theme,
    className,
    fullWidth && styles.elIsFullWidth,
    loading && styles.elIsLoading,
  )

  return (
    <button type={type} className={combinedClassName} disabled={disabled} onClick={onClick} data-test={dataTest}>
      {children}
    </button>
  )
}
