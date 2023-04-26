import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { ElSnack, elSnackIcon, elSnackCloseIcon, ElSnackHolder } from './__styles__'
import { Icon, IconNames } from '../icon'
import { Intent, getIntentClassName } from '../../helpers/intent'

export interface SnackProps extends HTMLAttributes<HTMLDivElement> {
  icon?: IconNames
  intent?: Intent
  className?: string
  onRemove?: () => void // onRemove callback added by the SnackHolder component
  text?: string // used for shorthand snack creation inside the useSnacks hook
  _id?: string //internal identifier to remove snacks after a timeout
}

export interface SnackHolderProps extends HTMLAttributes<HTMLDivElement> {
  snacks: SnackProps[]
  removeSnackById?: (id: string) => void
}

export const SnackHolder: FC<SnackHolderProps> = ({ snacks, removeSnackById, ...rest }) => {
  return (
    <ElSnackHolder {...rest}>
      {snacks &&
        snacks.map(({ text, _id, ...rest }) => (
          <Snack key={_id} onRemove={() => _id && removeSnackById && removeSnackById(_id)} {...rest}>
            {text}
          </Snack>
        ))}
    </ElSnackHolder>
  )
}

export const Snack: FC<SnackProps> = ({ icon, intent = 'secondary', className, onRemove, children, ...rest }) => {
  const intentClassName = getIntentClassName(intent)
  const combinedClassName = cx(className, intentClassName)

  return (
    <ElSnack className={combinedClassName} {...rest}>
      {icon && <Icon className={elSnackIcon} intent={intent} fontSize="1.25rem" icon={icon} />}
      {children}
      {onRemove && <Icon className={elSnackCloseIcon} data-testid="close-icon" onClick={onRemove} icon="closeSystem" />}
    </ElSnack>
  )
}
