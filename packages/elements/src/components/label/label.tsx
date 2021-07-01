import * as React from 'react'
import { ElLabel } from './__styles__'

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({ children, ...rest }) => {
  return <ElLabel {...rest}>{children}</ElLabel>
}
