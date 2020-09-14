import React from 'react'
import { cx } from 'linaria'
import {
  elButton,
  elButtonPrimary,
  elButtonSecondary,
  elButtonDanger,
  elButtonInfo,
  elButtonLoading,
  elButtonGroup,
} from './styles'
import { elFlexJustifyCenter } from '../../base/flexbox'
import { elWFull } from '../../base/sizing'

interface ButtonProps
  extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  type?: 'submit' | 'reset' | 'button'
  variant?: 'primary' | 'secondary' | 'danger' | 'info'
  isLoading?: boolean
  isFullWidth?: boolean
  onClick?: () => void
  className?: string
  children?: React.ReactNode
}

interface ButtonGroupProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isCentered?: boolean
  className?: string
  children?: React.ReactNode
}

const variantClass = {
  primary: elButtonPrimary,
  secondary: elButtonSecondary,
  info: elButtonInfo,
  danger: elButtonDanger,
}

export const Button: React.FC<ButtonProps> = ({
  // props from HTMLButtonElement
  type = 'button',
  disabled = false,
  // custom props
  variant = 'primary',
  isLoading = false,
  isFullWidth = false,
  className,
  children,
  onClick,
  ...rest
}) => {
  return (
    <button
      className={cx(elButton, variantClass[variant], isFullWidth && elWFull, isLoading && elButtonLoading, className)}
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  )
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ isCentered = false, className, children, ...rest }) => {
  return (
    <div className={cx(elButtonGroup, isCentered && elFlexJustifyCenter, className)} {...rest}>
      {children}
    </div>
  )
}

export default Button
