import * as React from 'react'
import { ElInputGroup } from './__styles__'
import { Input } from '../Input'
import { Icon, IconNames } from '../Icon'
import { Label } from '../Label'
import { AfterInputText } from '../AfterInputText'
import { Intent } from '../../helpers/v3/intent'

export interface IInputGroup extends React.HTMLAttributes<HTMLDivElement> {
  icon?: IconNames
  label?: string
  afterInputText?: string
  /**
   * This is passed down and added directly to the `Icon` and `AfterInputText` components (if in use)
   */
  intent?: Intent
  /**
   * This gets added to the Input as an ID and the Label as an `htmlFor`  prop, so that clicking on the label focusses the input. Generates a random ID if one isn't supplied
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

export const InputGroup: React.FC<IInputGroup> = ({
  icon,
  label,
  className,
  id,
  intent,
  afterInputText,
  children,
  ...rest
}) => {
  const groupId = React.useMemo(() => {
    if (id) return id
    return generateRandomId()
  }, [id])

  if (!children)
    return (
      <ElInputGroup className={className}>
        <Input id={groupId} {...rest} />
        {icon && <Icon intent={intent} icon={icon} />}
        {label && <Label htmlFor={groupId}>{label}</Label>}
        {afterInputText && <AfterInputText intent={intent}>{afterInputText}</AfterInputText>}
      </ElInputGroup>
    )

  return <ElInputGroup {...rest}>{children}</ElInputGroup>
}
