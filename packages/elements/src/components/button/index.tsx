import * as React from 'react'
import { cx } from 'linaria'
import { Intent, getIntentClassName } from '../../helpers/intent'
import { elIsLoading } from '../../styles/states'
import * as styles from './__styles__'
import { ElButton, ElButtonGroup } from './__styles__'
import { elWFull } from '../../styles/sizing'

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: Intent
  loading?: boolean
  chevronLeft?: boolean
  chevronRight?: boolean
  fullWidth?: boolean
  className?: string
  size?: 2 | 3 | 4
}

const resolveButtonSize = (size: 2 | 3 | 4): string => {
  switch (size) {
    case 2:
      return styles.ElButtonSize2
    case 3:
      return styles.ElButtonSize3
    case 4:
      return styles.ElButtonSize4
  }
}

export const Button: React.FC<IButton> = ({
  intent,
  loading = false,
  chevronLeft = false,
  chevronRight = false,
  fullWidth = false,
  className = '',
  children,
  size,
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
    size && resolveButtonSize(size),
  )

  return (
    <ElButton className={combinedClassName} {...rest}>
      {children}
    </ElButton>
  )
}

export const ButtonGroup: React.FC = ({children}) => {
  return <ElButtonGroup>{children}</ElButtonGroup>
}
