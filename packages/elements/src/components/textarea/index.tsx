import * as React from 'react'
import { ElTextArea } from './__styles__'

export interface ITextArea extends React.InputHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea: React.FC<ITextArea> = ({ ...rest }) => {
  return <ElTextArea {...rest} />
}
