import React, { ButtonHTMLAttributes, FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { Intent } from '../../helpers/intent'
import { elIsLoading } from '../../styles/states'
import * as styles from './__styles__'
import {
  ElButton,
  ElButtonGroup,
  elButtonGroupAlignCenter,
  elButtonGroupAlignLeft,
  elButtonGroupAlignRight,
  ElButtonGroupInner,
  elButtonIconOnly,
  ElButtonLoader,
  elButtonSizeLarge,
  elButtonSizeMedium,
  elButtonSizeSmall,
} from './__styles__'
import { Icon, IconNames } from '../icon'
import { elIntentDanger, elIntentNeutral, elIntentPrimary } from '../../styles/intent'
import { deprecateFunction, useDeprecateVar } from '../../storybook/deprecate-var'
import { elMl1, elMr1 } from '../../styles/spacing'

export type ButtonSizeType = 2 | 3 | 4
export type ButtonSize = 'small' | 'medium' | 'large'
export interface ButtonIcon {
  icon: IconNames
  position: 'left' | 'right' | 'only'
}

export type ButtonGroupAlignment = 'left' | 'right' | 'center'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent?: Intent
  loading?: boolean
  className?: string
  buttonSize?: ButtonSize
  buttonIcon?: ButtonIcon
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const resolveButtonSize = (size: ButtonSizeType): void => {
  deprecateFunction('resolveButtonSize')
}

export const resolveButtonClassName = (intent?: Intent): string => {
  switch (intent) {
    case 'primary':
      return elIntentPrimary
    case 'danger':
      return elIntentDanger
    case 'neutral':
      return elIntentNeutral
    case 'pending':
    case 'success':
    case 'warning':
    case 'critical':
    case 'low':
    case 'secondary':
      console.warn(`${intent} intent is no longer supported for buttons and will be removed at v5 release.`)
      return elIntentNeutral
    default:
      return elIntentNeutral
  }
}

export const Button: FC<ButtonProps> = ({
  intent,
  loading = false,
  chevronLeft,
  chevronRight,
  fullWidth,
  fixedWidth,
  buttonSize,
  buttonIcon,
  className = '',
  children,
  size,
  ...rest
}) => {
  const intentClassname = resolveButtonClassName(intent)
  const isIconOnly = buttonIcon?.icon && buttonIcon.position === 'only'
  const sizeClass = cx(
    isIconOnly && elButtonIconOnly,
    buttonSize === 'small' && elButtonSizeSmall,
    buttonSize === 'large' && elButtonSizeLarge,
    buttonSize === 'medium' && elButtonSizeMedium,
  )
  const combinedClassName = cx(className, sizeClass, intentClassname, loading && elIsLoading)

  useDeprecateVar({ chevronLeft, chevronRight, fullWidth, fixedWidth, size }, 'Button')

  return (
    <ElButton className={combinedClassName} {...rest}>
      <ElButtonLoader />
      {isIconOnly ? (
        <Icon intent="default" icon={buttonIcon.icon} fontSize="1rem" />
      ) : (
        <>
          {buttonIcon?.icon && buttonIcon.position === 'left' && (
            <Icon className={elMr1} intent="default" fontSize="1rem" icon={buttonIcon.icon} />
          )}
          {children}
          {buttonIcon?.icon && buttonIcon.position === 'right' && (
            <Icon className={elMl1} intent="default" fontSize="1rem" icon={buttonIcon.icon} />
          )}
        </>
      )}
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
      <Icon icon={icon} />
    </Button>
  )
}
