import React, { forwardRef, LegacyRef } from 'react'
import { cx } from '@linaria/core'
import { ElInput, elHasInputError } from './__styles__'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

export type InputWrapped = React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<React.InputHTMLAttributes<HTMLInputElement>>
>

export const Input: InputWrapped = forwardRef(
  ({ hasError, ...rest }, ref: React.ForwardedRef<React.InputHTMLAttributes<HTMLInputElement>>) => {
    return (
      <ElInput
        className={cx(hasError && elHasInputError)}
        {...rest}
        ref={(ref as unknown) as LegacyRef<HTMLInputElement>}
      />
    )
  },
)
