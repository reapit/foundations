import * as React from 'react'
import { ElInputGroup } from './__styles__'
import { Input } from '../Input'
import { Icon, IconNames } from '../Icon'
import { Label } from '../Label'

export interface IInputGroup extends React.HTMLAttributes<HTMLDivElement> {
  icon?: IconNames
  label?: string
  className?: string
  id?: string
}

const generateRandomId = (): string => {
  try {
    return Math.random().toString(36).substring(7)
  } catch (e) {
    return ''
  }
}

export const InputGroup: React.FC<IInputGroup> = ({
  icon,
  label,
  className,
  id = generateRandomId(),
  children,
  ...rest
}) => {
  if (!children)
    return (
      <ElInputGroup className={className}>
        <Input id={id} {...rest} />
        {icon && <Icon icon={icon} />}
        {label && <Label htmlFor={id}>{label}</Label>}
      </ElInputGroup>
    )

  return <ElInputGroup {...rest}>{children}</ElInputGroup>
}
