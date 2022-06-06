import { cx } from '@linaria/core'
import React, { FC, HTMLAttributes } from 'react'
import { ElPersistantNotification } from './__styles__'
import { Icon, IconNames } from '../icon'
import { elIsActive } from '../../styles/states'
import { Intent, getIntentClassName } from '../../helpers/intent'
import { elPnContent, elPnIcon, elPnIsFixed, elPnIsFullWidth, elPnIsInline } from '../persistent-notification'

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
  console.info(
    'This component has been re-named PersistentNotification to correct a spelling mistake. You should update your components as this will be removed in future versions',
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
