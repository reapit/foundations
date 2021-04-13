import * as React from 'react'
import { cx } from 'linaria'
import { ElSnack } from './__styles__'
import { Icon, IconNames } from '../Icon'
import { Intent, getIntentClassName } from '../../helpers/v3/intent'

export interface ISnack extends React.HTMLAttributes<HTMLDivElement> {
  icon?: IconNames
  intent?: Intent
  className?: string
  text?: string
  _id?: string //internal identifier to remove snacks after a timeout
}

export const Snack: React.FC<ISnack> = ({ icon, intent = 'secondary', className, children, ...rest }) => {
  const intentClassName = getIntentClassName(intent)
  const combinedClassName = cx(className, intentClassName)

  return (
    <ElSnack className={combinedClassName} {...rest}>
      {icon && <Icon fontSize="1.25rem" icon={icon} />}
      {children}
    </ElSnack>
  )
}
