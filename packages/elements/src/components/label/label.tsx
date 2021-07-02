import React, { FC, LabelHTMLAttributes } from 'react'
import { ElLabel } from './__styles__'

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: FC<LabelProps> = ({ children, ...rest }) => {
  return <ElLabel {...rest}>{children}</ElLabel>
}
