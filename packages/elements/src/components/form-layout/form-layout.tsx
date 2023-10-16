import { cx } from '@linaria/core'
import React, { FC, HTMLAttributes, forwardRef, LegacyRef } from 'react'
import {
  ElFormLayout,
  ElInputWrap,
  ElInputWrapMed,
  ElInputWrapFull,
  elFormLayoutHasMargin,
  ElInputWrapSmall,
  ElFormSectionDivider,
} from './__styles__'

export type FormLayoutProps = HTMLAttributes<HTMLDivElement> & {
  hasMargin?: boolean
}

export const FormLayout: FC<FormLayoutProps> = ({ children, hasMargin, className, ...rest }) => {
  return (
    <ElFormLayout className={cx(hasMargin && elFormLayoutHasMargin, className)} {...rest}>
      {children}
    </ElFormLayout>
  )
}

export const FormSectionDivider: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElFormSectionDivider {...rest}>{children}</ElFormSectionDivider>
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

export const InputWrapSmall: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElInputWrapSmall {...rest}>{children}</ElInputWrapSmall>
}

export const InputWrapMed: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElInputWrapMed {...rest}>{children}</ElInputWrapMed>
}

export const InputWrapFull: FC<FormLayoutProps> = ({ children, ...rest }) => {
  return <ElInputWrapFull {...rest}>{children}</ElInputWrapFull>
}
