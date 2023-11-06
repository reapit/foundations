import { cx } from '@linaria/core'
import React, { FC, HTMLAttributes } from 'react'
import {
  ElPersistentNotification,
  elPnIcon,
  elPnContent,
  elPnIsFullWidth,
  elPnIsFixed,
  elPnIsInline,
} from './__styles__'
import { Icon, IconNames } from '../icon'
import { elIsActive } from '../../styles/states'
import { Intent, getIntentClassName } from '../../helpers/intent'

export interface PersistentNotificationProps extends HTMLAttributes<HTMLDivElement> {
  icon?: IconNames
  intent?: Intent
  className?: string
  isExpanded?: boolean
  isFullWidth?: boolean
  isFixed?: boolean
  isInline?: boolean
  onExpansionToggle?: (newState: boolean) => void
}

export const PersistentNotification: FC<PersistentNotificationProps> = ({
  icon = 'info',
  intent = 'primary',
  className,
  isExpanded = false,
  isFullWidth = false,
  isFixed = false,
  isInline = false,
  onExpansionToggle,
  children,
  ...rest
}) => {
  const intentClassName = getIntentClassName(intent)
  const combinedClassName = cx(
    className,
    intentClassName,
    isExpanded && elIsActive,
    isFullWidth && elPnIsFullWidth,
    isFixed && elPnIsFixed,
    isInline && elPnIsInline,
  )

  return (
    <ElPersistentNotification className={combinedClassName} {...rest}>
      <div
        className={elPnIcon}
        data-testid="close-icon"
        onClick={() => onExpansionToggle && onExpansionToggle(!isExpanded)}
      >
        <Icon fontSize="1.25rem" icon={icon} />
      </div>
      <div className={elPnContent}>{children}</div>
    </ElPersistentNotification>
  )
}
