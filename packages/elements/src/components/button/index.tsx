import * as React from 'react'
import { cx } from 'linaria'
import { Intent, getIntentClassName } from '../../helpers/intent'
import { elIsLoading } from '../../styles/states'
import * as styles from './__styles__'
import { ElButton, ElButtonGroup } from './__styles__'
import { elWFull } from '../../styles/sizing'
import { Icon, IconNames } from '../icon'

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: Intent
  loading?: boolean
  chevronLeft?: boolean
  chevronRight?: boolean
  fullWidth?: boolean
  className?: string
  size?: 2 | 3 | 4
}

export const resolveButtonSize = (size: 2 | 3 | 4): string => {
  switch (size) {
    case 2:
      return styles.elButtonSize2
    case 3:
      return styles.elButtonSize3
    case 4:
      return styles.elButtonSize4
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

export const ButtonGroup: React.FC = ({ children }) => {
  return <ElButtonGroup>{children}</ElButtonGroup>
}

export interface IFloatingButton extends IButton {
  icon: IconNames
}

export const FloatingButton: React.FC<IFloatingButton> = ({ icon, intent, ...rest }) => {
  return (
    <Button className={styles.elFloatingButton} intent={intent} {...rest}>
      <Icon icon={icon} intent={intent && 'neutral'} iconSize="small" />
    </Button>
  )
}
