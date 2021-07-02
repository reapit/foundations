import React, { FC, SelectHTMLAttributes } from 'react'
import { ElSelect } from './__styles__'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export const Select: FC<SelectProps> = ({ children, ...rest }) => {
  return <ElSelect {...rest}>{children}</ElSelect>
}
