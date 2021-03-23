import * as React from 'react'
import { cx } from 'linaria'
import { elIntentPrimary, elIntentInfo, elIntentSuccess, elIntentDanger } from '../../styles-v3/base/intent'
import * as styles from './__styles__'

export interface ButtonProps {
  type?: 'submit' | 'reset' | 'button'
  intent?: 'primary' | 'secondary' | 'cta' | 'success' | 'danger' | 'blank'
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  chevronLeft?: boolean
  chevronRight?: boolean
  className?: string
  dataTest?: string
}

export const Button: React.FC<ButtonProps> = ({
  type = 'button',
  intent,
  onClick,
  disabled = false,
  loading = false,
  chevronLeft = false,
  chevronRight = false,
  className = '',
  dataTest = '',
  children,
}) => {
  let intentClassname = ''
  switch (intent) {
    case 'primary':
      {
        intentClassname = elIntentPrimary
      }
      break
    // case 'secondary':
    //   {
    //     intentClassname = elIntentSecondary
    //   }
    //   break
    // case 'cta':
    //   {
    //     intentClassname = elIntentCta
    //   }
    //   break
    case 'success':
      {
        intentClassname = elIntentSuccess
      }
      break
    case 'danger':
      {
        intentClassname = elIntentDanger
      }
      break
    // case 'blank':
    //   {
    //     intentClassname = elIntentBlank
    //   }
    //   break
  }

  const combinedClassName = cx(
    styles.elButton,
    intentClassname,
    className,
    chevronLeft && styles.elButtonHasLeftChevron,
    chevronRight && styles.elButtonHasRightChevron,
    disabled && styles.elButtonIsDisabled,
    loading && styles.elButtonIsLoading,
  )

  const otherProps = {} as {
    'data-test'?: string
    disabled?: boolean
  }

  if (dataTest) otherProps['data-test'] = dataTest
  if (disabled) otherProps.disabled = true

  return (
    <button type={type} className={combinedClassName} onClick={onClick} {...otherProps}>
      {children}
    </button>
  )
}
