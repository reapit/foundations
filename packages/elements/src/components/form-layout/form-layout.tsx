import React, { FC, HTMLAttributes } from 'react'
import { ElFormLayout, ElInputWrap, ElInputWrapMed, ElInputWrapFull } from './__styles__'

export type FormLayoutProps = HTMLAttributes<HTMLDivElement>

export const FormLayout: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElFormLayout {...rest}>{children}</ElFormLayout>
}

export const InputWrap: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElInputWrap {...rest}>{children}</ElInputWrap>
}

export const InputWrapMed: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElInputWrapMed {...rest}>{children}</ElInputWrapMed>
}

export const InputWrapFull: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElInputWrapFull {...rest}>{children}</ElInputWrapFull>
}
