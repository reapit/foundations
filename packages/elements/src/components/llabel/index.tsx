import * as React from 'react'
import { ElLabel } from './__styles__'

export interface ILabel extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<ILabel> = ({ children, ...rest }) => {
  return <ElLabel {...rest}>{children}</ElLabel>
}
