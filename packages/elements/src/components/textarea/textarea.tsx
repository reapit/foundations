import React, { forwardRef, InputHTMLAttributes, LegacyRef } from 'react'
import { ElTextArea } from './__styles__'

export interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {}

export type TextAreaWrapped = React.ForwardRefExoticComponent<
  TextAreaProps & React.RefAttributes<React.TextareaHTMLAttributes<HTMLTextAreaElement>>
>

export const TextArea: TextAreaWrapped = forwardRef(({ ...rest }, ref) => {
  return <ElTextArea {...rest} ref={(ref as unknown) as LegacyRef<HTMLTextAreaElement>} />
})
