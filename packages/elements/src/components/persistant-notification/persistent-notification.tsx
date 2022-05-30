import { cx } from '@linaria/core'
import React, { FC, HTMLAttributes } from 'react'
import {
  ElPersistantNotification,
  elPnIcon,
  elPnContent,
  elPnIsFullWidth,
  elPnIsFixed,
  elPnIsInline,
} from './__styles__'
import { Icon, IconNames } from '../icon'
import { elIsActive } from '../../styles/states'
import { Intent, getIntentClassName } from '../../helpers/intent'

export interface IPersistantNotification extends HTMLAttributes<HTMLDivElement> {
  icon?: IconNames
  intent?: Intent
  className?: string
  isExpanded?: boolean
  isFullWidth?: boolean
  isFixed?: boolean
  isInline?: boolean
  onExpansionToggle?: (newState: boolean) => void
}

export const PersistantNotification: FC<IPersistantNotification> = ({
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
    isFullWidth && elPnIsFullWidth,
    isFixed && elPnIsFixed,
    isInline && elPnIsInline,
  )

  return (
    <ElPersistantNotification className={combinedClassName} {...rest}>
      <div
        className={elPnIcon}
        data-testid="close-icon"
        onClick={() => onExpansionToggle && onExpansionToggle(!isExpanded)}
      >
        <Icon icon={icon} />
      </div>
      <div className={elPnContent}>{children}</div>
    </ElPersistantNotification>
  )
}
