import * as React from 'react'
import { cx } from 'linaria'
import { Intent, getIntentClassName } from '../../helpers/v3/intent'
import { elIsLoading } from '../../styles-v3/base/states'
import * as styles from './__styles__'
import { ElButton } from './__styles__'
import { elWFull } from '../../styles-v3/base/sizing'

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: Intent
  loading?: boolean
  chevronLeft?: boolean
  chevronRight?: boolean
  fullWidth?: boolean
  className?: string
}

export const Button: React.FC<IButton> = ({
  intent,
  loading = false,
  chevronLeft = false,
  chevronRight = false,
  fullWidth = false,
  className = '',
  children,
  ...rest
}) => {
  const intentClassname = intent && getIntentClassName(intent)
  const combinedClassName = cx(
    className,
    intentClassname,
    chevronLeft && styles.elButtonHasLeftChevron,
    chevronRight && styles.elButtonHasRightChevron,
    loading && elIsLoading,
    fullWidth && elWFull,
  )

  return (
    <ElButton className={combinedClassName} {...rest}>
      {children}
    </ElButton>
  )
}
