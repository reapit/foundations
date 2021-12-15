import React, { FC, HTMLAttributes, forwardRef, LegacyRef } from 'react'
import { ElFormLayout, ElInputWrap, ElInputWrapMed, ElInputWrapFull } from './__styles__'

export type FormLayoutProps = HTMLAttributes<HTMLDivElement>

export const FormLayout: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElFormLayout {...rest}>{children}</ElFormLayout>
}

export const InputWrap: React.ForwardRefExoticComponent<
  FormLayoutProps & React.RefAttributes<HTMLDivElement>
> = forwardRef(({ children, ...rest }, ref) => {
  return (
    <ElInputWrap {...rest} ref={ref as LegacyRef<HTMLDivElement>}>
      {children}
    </ElInputWrap>
  )
})

export const InputWrapMed: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElInputWrapMed {...rest}>{children}</ElInputWrapMed>
}

export const InputWrapFull: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElInputWrapFull {...rest}>{children}</ElInputWrapFull>
}
