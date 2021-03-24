import * as React from 'react'
import { cx } from 'linaria'
import {
  elIntentPrimary,
  elIntentSecondary,
  elIntentCta,
  elIntentSuccess,
  elIntentDanger,
} from '../../styles-v3/base/intent'
import * as styles from './__styles__'
import { ElButton } from './__styles__'

export interface ButtonProps {
  intent?: 'primary' | 'secondary' | 'cta' | 'success' | 'danger'
  loading?: boolean
  chevronLeft?: boolean
  chevronRight?: boolean
  className?: string
}

export const Button: React.FC<ButtonProps> = ({
  intent,
  loading = false,
  chevronLeft = false,
  chevronRight = false,
  className = '',
  children,
  ...rest
}) => {
  let intentClassname = ''
  switch (intent) {
    case 'primary':
      {
        intentClassname = elIntentPrimary
      }
      break
    case 'secondary':
      {
        intentClassname = elIntentSecondary
      }
      break
    case 'cta':
      {
        intentClassname = elIntentCta
      }
      break
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
  }

  const combinedClassName = cx(
    className,
    intentClassname,
    chevronLeft && styles.elButtonHasLeftChevron,
    chevronRight && styles.elButtonHasRightChevron,
    // loading && styles.elButtonIsLoading,
  )

  return (
    <ElButton className={combinedClassName} {...rest}>
      {children}
    </ElButton>
  )
}
