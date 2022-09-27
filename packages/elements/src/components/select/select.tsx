import React, { forwardRef, LegacyRef } from 'react'
import { ElSelect } from './__styles__'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export type SelectWrapped = React.ForwardRefExoticComponent<
  SelectProps & React.RefAttributes<React.SelectHTMLAttributes<HTMLSelectElement>>
>

export const Select: SelectWrapped = forwardRef(
  ({ children, ...rest }, ref: React.ForwardedRef<React.SelectHTMLAttributes<HTMLSelectElement>>) => {
    return (
      <ElSelect {...rest} ref={(ref as unknown) as LegacyRef<HTMLSelectElement>}>
        {children}
      </ElSelect>
    )
  },
)
