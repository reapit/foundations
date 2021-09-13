import React, { ButtonHTMLAttributes, FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { Intent, getIntentClassName } from '../../helpers/intent'
import { elIsLoading } from '../../styles/states'
import * as styles from './__styles__'
import { ElButton, ElButtonGroup } from './__styles__'
import { elWFull } from '../../styles/sizing'
import { Icon, IconNames } from '../icon'

export type ButtonSizeType = 2 | 3 | 4
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: Intent
  loading?: boolean
  chevronLeft?: boolean
  chevronRight?: boolean
  fullWidth?: boolean
  className?: string
  size?: ButtonSizeType
}

export const resolveButtonSize = (size: ButtonSizeType): string => {
  switch (size) {
    case 2:
      return styles.elButtonSize2
    case 3:
      return styles.elButtonSize3
    case 4:
      return styles.elButtonSize4
  }
}

export const Button: FC<ButtonProps> = ({
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

export const ButtonGroup: FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
  return <ElButtonGroup {...rest}>{children}</ElButtonGroup>
}

export interface IFloatingButton extends ButtonProps {
  icon: IconNames
}

export const FloatingButton: FC<IFloatingButton> = ({ icon, intent, ...rest }) => {
  return (
    <Button className={styles.elFloatingButton} intent={intent} {...rest}>
      <Icon icon={icon} intent={intent ? 'neutral' : undefined} iconSize="small" />
    </Button>
  )
}
