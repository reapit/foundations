import { cx } from '@linaria/core'
import React, { FC, HTMLAttributes } from 'react'
import {
  ElPersistentNotification,
  elPersistentNotificationIcon,
  elPersistentNotificationContent,
  elPersistentNotificationIsFullWidth,
  elPersistentNotificationIsFixed,
  elPersistentNotificationIsInline,
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
  icon = 'infoSolidSystem',
  intent = 'secondary',
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
    isFullWidth && elPersistentNotificationIsFullWidth,
    isFixed && elPersistentNotificationIsFixed,
    isInline && elPersistentNotificationIsInline,
  )

  return (
    <ElPersistentNotification className={combinedClassName} {...rest}>
      <div
        className={elPersistentNotificationIcon}
        data-testid="close-icon"
        onClick={() => onExpansionToggle && onExpansionToggle(!isExpanded)}
      >
        <Icon icon={icon} />
      </div>
      <div className={elPersistentNotificationContent}>{children}</div>
    </ElPersistentNotification>
  )
}
