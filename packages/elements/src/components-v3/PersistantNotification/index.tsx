import { cx } from 'linaria'
import * as React from 'react'
import { ElPersistantNotification, elPnIcon, elPnContent } from './__styles__'
import { Icon, IconNames } from '../Icon'
import { elIsActive } from '../../styles-v3/base/states'
import { Intent, getIntentClassName } from '../../helpers/v3/intent'

export interface IPersistantNotification extends React.HTMLAttributes<HTMLDivElement> {
  icon?: IconNames
  intent?: Intent
  className?: string
  isExpanded?: boolean
  onExpansionToggle?: (newState: boolean) => void
}

export const PersistantNotification: React.FC<IPersistantNotification> = ({
  icon = 'info',
  intent = 'secondary',
  className,
  isExpanded = false,
  onExpansionToggle,
  children,
  ...rest
}) => {
  const intentClassName = getIntentClassName(intent)
  const combinedClassName = cx(className, intentClassName, isExpanded && elIsActive)

  return (
    <ElPersistantNotification className={combinedClassName} {...rest}>
      <div className={elPnIcon} onClick={() => onExpansionToggle && onExpansionToggle(!isExpanded)}>
        <Icon icon={icon} />
      </div>
      <div className={elPnContent}>{children}</div>
    </ElPersistantNotification>
  )
}
