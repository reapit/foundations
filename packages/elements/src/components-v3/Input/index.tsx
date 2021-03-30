import * as React from 'react'
import { ElInput } from './__styles__'

export const Input: React.FC = ({ icon, children, ...rest }) => {
  return <ElInput {...rest} />
}
