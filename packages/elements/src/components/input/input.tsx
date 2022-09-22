import React, { forwardRef, LegacyRef } from 'react'
import { ElInput } from './__styles__'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export type InputWrapped = React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<React.InputHTMLAttributes<HTMLInputElement>>
>

export const Input: InputWrapped = forwardRef(
  ({ ...rest }, ref: React.ForwardedRef<React.InputHTMLAttributes<HTMLInputElement>>) => {
    return <ElInput {...rest} ref={(ref as unknown) as LegacyRef<HTMLInputElement>} />
  },
)
