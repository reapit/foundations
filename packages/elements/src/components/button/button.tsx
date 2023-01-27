import React, { ButtonHTMLAttributes, FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { Intent, getIntentClassName } from '../../helpers/intent'
import { elIsLoading } from '../../styles/states'
import * as styles from './__styles__'
import {
  ElButton,
  ElButtonGroup,
  elButtonGroupAlignCenter,
  elButtonGroupAlignLeft,
  elButtonGroupAlignRight,
  ElButtonGroupInner,
  ElButtonLoader,
} from './__styles__'
import { elWFull } from '../../styles/sizing'
import { Icon, IconNames } from '../icon'

export type ButtonSizeType = 2 | 3 | 4

export type ButtonGroupAlignment = 'left' | 'right' | 'center'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: Intent
  loading?: boolean
  chevronLeft?: boolean
  chevronRight?: boolean
  fullWidth?: boolean
  className?: string
  fixedWidth?: boolean
  /** Deprecated - remains part of API to avoid a breaking change but no longer part of style guide */
  size?: ButtonSizeType
}

export interface FloatingButtonProps extends ButtonProps {
  icon: IconNames
}

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  alignment?: ButtonGroupAlignment
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
  fixedWidth = false,
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
    fixedWidth && styles.elButtonFixedWidth,
    loading && elIsLoading,
    fullWidth && elWFull,
    size && resolveButtonSize(size),
  )

  return (
    <ElButton className={combinedClassName} {...rest}>
      {children}
      <ElButtonLoader />
    </ElButton>
  )
}

export const ButtonGroup: FC<ButtonGroupProps> = ({ children, alignment, ...rest }) => {
  const alignmentClass = cx(
    alignment === 'left' && elButtonGroupAlignLeft,
    alignment === 'right' && elButtonGroupAlignRight,
    alignment === 'center' && elButtonGroupAlignCenter,
  )
  return (
    <ElButtonGroup {...rest}>
      <ElButtonGroupInner className={alignmentClass}>{children}</ElButtonGroupInner>
    </ElButtonGroup>
  )
}

export const FloatingButton: FC<FloatingButtonProps> = ({ icon, intent, ...rest }) => {
  return (
    <Button className={styles.elFloatingButton} intent={intent} {...rest}>
      <Icon icon={icon} intent={intent ? 'neutral' : undefined} iconSize="small" />
    </Button>
  )
}
