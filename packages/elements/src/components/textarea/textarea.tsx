import React, { FC, InputHTMLAttributes } from 'react'
import { ElTextArea } from './__styles__'

export interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea: FC<TextAreaProps> = ({ ...rest }) => {
  return <ElTextArea {...rest} />
}
