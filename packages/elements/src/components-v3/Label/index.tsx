import * as React from 'react'
import { ElLabel } from './__styles__'

export const Label: React.FC = ({ children, ...rest }) => {
  return <ElLabel {...rest}>{children}</ElLabel>
}
