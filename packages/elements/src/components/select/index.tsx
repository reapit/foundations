import * as React from 'react'
import { ElSelect } from './__styles__'

export interface ISelect extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select: React.FC<ISelect> = ({ children, ...rest }) => {
  return <ElSelect {...rest}>{children}</ElSelect>
}
