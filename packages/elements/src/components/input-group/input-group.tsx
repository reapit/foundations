import React, { forwardRef, useMemo } from 'react'
import { ElInputGroup } from './__styles__'
import { Input } from '../input'
import { Icon, IconNames } from '../icon'
import { Label } from '../label'
import { InputAddOn } from '../input-add-on'
import { Intent } from '../../helpers/intent'
import { generateRandomId } from '../../storybook/random-id'
import { InputError } from '../input-error'

export interface InputGroupProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: IconNames | null
  label?: string
  inputAddOnText?: string
  hasError?: boolean
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
  errorMessage?: string
}

export type InputGroupWrapped = React.ForwardRefExoticComponent<
  InputGroupProps & React.RefAttributes<React.InputHTMLAttributes<HTMLInputElement>>
>

export const InputGroup: InputGroupWrapped = forwardRef(
  (
    { icon, label, className, id, intent, inputAddOnText, children, errorMessage, hasError, ...rest }: InputGroupProps,
    ref: React.ForwardedRef<React.InputHTMLAttributes<HTMLInputElement>>,
  ) => {
    const groupId = useMemo(() => {
      if (id) return id
      return generateRandomId()
    }, [id])

    if (!children)
      return (
        <ElInputGroup className={className}>
          <Input hasError={Boolean(hasError || errorMessage)} id={groupId} {...rest} ref={ref} />
          {icon && <Icon fontSize="1rem" intent={intent} icon={icon} />}
          {label && <Label htmlFor={groupId}>{label}</Label>}
          {inputAddOnText && <InputAddOn intent={intent}>{inputAddOnText}</InputAddOn>}
          {errorMessage && <InputError message={errorMessage} />}
        </ElInputGroup>
      )

    return (
      <ElInputGroup className={className} {...rest}>
        {children}
      </ElInputGroup>
    )
  },
)
