import { cx } from 'linaria'
import * as React from 'react'
import { ElPersistantNotification, elPnIcon, elPnContent, elPnIsFullWidth, elPnIsFixed } from './__styles__'
import { Icon, IconNames } from '../icon'
import { elIsActive } from '../../styles/states'
import { Intent, getIntentClassName } from '../../helpers/intent'

export interface IPersistantNotification extends React.HTMLAttributes<HTMLDivElement> {
  icon?: IconNames
  intent?: Intent
  className?: string
  isExpanded?: boolean
  isFullWidth?: boolean
  isFixed?: boolean
  onExpansionToggle?: (newState: boolean) => void
}

export const PersistantNotification: React.FC<IPersistantNotification> = ({
  icon = 'infoSolidSystem',
  intent = 'secondary',
  className,
  isExpanded = false,
  isFullWidth = false,
  isFixed = false,
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
  )

  return (
    <ElPersistantNotification className={combinedClassName} {...rest}>
      <div className={elPnIcon} onClick={() => onExpansionToggle && onExpansionToggle(!isExpanded)}>
        <Icon icon={icon} />
      </div>
      <div className={elPnContent}>{children}</div>
    </ElPersistantNotification>
  )
}
