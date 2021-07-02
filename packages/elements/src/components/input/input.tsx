import React, { FC, InputHTMLAttributes } from 'react'
import { ElInput } from './__styles__'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<InputProps> = ({ ...rest }) => {
  return <ElInput {...rest} />
}
