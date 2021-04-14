import * as React from 'react'
import { cx } from 'linaria'
import { ElSnack, elSnackIcon, elSnackCloseIcon } from './__styles__'
import { Icon, IconNames } from '../Icon'
import { Intent, getIntentClassName } from '../../helpers/v3/intent'

export interface ISnack extends React.HTMLAttributes<HTMLDivElement> {
  icon?: IconNames
  intent?: Intent
  className?: string
  onRemove?: () => void // onRemove callback added by the SnackHolder component
  text?: string // used for shorthand snack creation inside the useSnacks hook
  _id?: string //internal identifier to remove snacks after a timeout
}

export const Snack: React.FC<ISnack> = ({ icon, intent = 'secondary', className, onRemove, children, ...rest }) => {
  const intentClassName = getIntentClassName(intent)
  const combinedClassName = cx(className, intentClassName)

  return (
    <ElSnack className={combinedClassName} {...rest}>
      {icon && <Icon className={elSnackIcon} intent={intent} fontSize="1.25rem" icon={icon} />}
      {children}
      {onRemove && <Icon className={elSnackCloseIcon} onClick={onRemove} icon="close" />}
    </ElSnack>
  )
}
