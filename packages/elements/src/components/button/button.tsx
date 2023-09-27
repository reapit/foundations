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
import { Icon, IconNames } from '../icon'
import { elIntentDanger, elIntentNeutral, elIntentPrimary } from '../../styles/intent'

export type ButtonSizeType = 2 | 3 | 4

export type ButtonGroupAlignment = 'left' | 'right' | 'center'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: Intent
  loading?: boolean
  className?: string
  /** Deprecated - will be removed at v5 release */
  chevronLeft?: boolean
  /** Deprecated - will be removed at v5 release */
  chevronRight?: boolean
  /** Deprecated - will be removed at v5 release */
  fullWidth?: boolean
  /** Deprecated - will be removed at v5 release */
  fixedWidth?: boolean
  /** Deprecated - will be removed at v5 release */
  size?: ButtonSizeType
}

export interface FloatingButtonProps extends ButtonProps {
  icon: IconNames
}

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  alignment?: ButtonGroupAlignment
}

export const resolveButtonSize = (_size: ButtonSizeType): void => {
  console.warn('Button size prop is deprecated and will be removed at v5 release')
}

export const resolveButtonClassName = (intent?: Intent): string => {
  switch (intent) {
    case 'pending':
    case 'success':
    case 'warning':
    case 'critical':
    case 'low':
    case 'secondary':
      console.warn(`${intent} intent is no longer supported for buttons and will be removed at v5 release.`)
    case 'primary':
      return elIntentPrimary
    case 'danger':
      return elIntentDanger
    case 'neutral':
    default:
      return elIntentNeutral
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
  const intentClassname = resolveButtonClassName(intent)
  const combinedClassName = cx(className, intentClassname, loading && elIsLoading)

  return (
    <ElButton className={combinedClassName} {...rest}>
      <ElButtonLoader />
      {children}
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
      <Icon icon={icon} iconSize="small" />
    </Button>
  )
}
