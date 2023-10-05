import React, { forwardRef, InputHTMLAttributes, LegacyRef } from 'react'
import { ElTextArea, elTextAreaHasError } from './__styles__'
import { cx } from '@linaria/core'

export interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean
}

export type TextAreaWrapped = React.ForwardRefExoticComponent<
  TextAreaProps & React.RefAttributes<React.TextareaHTMLAttributes<HTMLTextAreaElement>>
>

export const TextArea: TextAreaWrapped = forwardRef(({ hasError, ...rest }, ref) => {
  return (
    <ElTextArea
      className={cx(hasError && elTextAreaHasError)}
      {...rest}
      ref={(ref as unknown) as LegacyRef<HTMLTextAreaElement>}
    />
  )
})
