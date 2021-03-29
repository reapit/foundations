import * as React from 'react'
import { ElInput, ElInputWithIconContainer } from './__styles__'
import { Icon, IconNames } from '../Icon'

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: IconNames
  className?: string
}

export const Input: React.FC<IInput> = ({ icon, className, children, ...rest }) => {
  if (icon)
    return (
      <ElInputWithIconContainer>
        <ElInput {...rest} />
        <Icon icon={icon} />
      </ElInputWithIconContainer>
    )

  return <ElInput {...rest} />
}
