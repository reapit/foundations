import React, { FC, HTMLAttributes, useMemo } from 'react'
import { ElInputGroup } from './__styles__'
import { Input } from '../input'
import { Icon, IconNames } from '../icon'
import { Label } from '../label'
import { InputAddOn } from '../input-add-on'
import { Intent } from '../../helpers/intent'

export interface InputGroupProps extends HTMLAttributes<HTMLInputElement> {
  icon?: IconNames
  label?: string
  inputAddOnText?: string
  /**
   * This is passed down and added directly to the `Icon` and `InputAddOn`
   *components (if in use)
   */
  intent?: Intent
  /**
   * This gets added to the Input as an ID and the Label as an `htmlFor` prop,
   * so that clicking on the label focusses the input. Generates a random ID if
   * one isn't supplied
   */
  id?: string
  /**
   * Added to the InputGroup `div`
   */
  className?: string
}

const generateRandomId = (): string => {
  try {
    return `random-${Math.random().toString(36).substring(7)}`
  } catch (e) {
    return ''
  }
}

export const InputGroup: FC<InputGroupProps> = ({
  icon,
  label,
  className,
  id,
  intent,
  inputAddOnText,
  children,
  ...rest
}) => {
  const groupId = useMemo(() => {
    if (id) return id
    return generateRandomId()
  }, [id])

  if (!children)
    return (
      <ElInputGroup className={className}>
        <Input id={groupId} {...rest} />
        {icon && <Icon intent={intent} icon={icon} />}
        {label && <Label htmlFor={groupId}>{label}</Label>}
        {inputAddOnText && <InputAddOn intent={intent}>{inputAddOnText}</InputAddOn>}
      </ElInputGroup>
    )

  return <ElInputGroup {...rest}>{children}</ElInputGroup>
}
