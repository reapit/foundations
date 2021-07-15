import React, { FC, HTMLAttributes } from 'react'
import { cx } from '@linaria/core'
import { ElTitle, ElSubtitle, ElBodyText, ElSmallText, elHasGreyText, elIsBoldText, elIsItalicText } from './__styles__'

export interface ITypographyProps extends HTMLAttributes<HTMLElement> {
  hasGreyText?: boolean
  bold?: boolean
  italic?: boolean
}

export const Title: FC<ITypographyProps> = ({ hasGreyText, children, bold, italic, ...rest }) => {
  return (
    <ElTitle className={cx(hasGreyText && elHasGreyText, bold && elIsBoldText, italic && elIsItalicText)} {...rest}>
      {children}
    </ElTitle>
  )
}

export const Subtitle: FC<ITypographyProps> = ({ hasGreyText, children, bold, italic, ...rest }) => {
  return (
    <ElSubtitle className={cx(hasGreyText && elHasGreyText, bold && elIsBoldText, italic && elIsItalicText)} {...rest}>
      {children}
    </ElSubtitle>
  )
}

export const BodyText: FC<ITypographyProps> = ({ hasGreyText, children, bold, italic, ...rest }) => {
  return (
    <ElBodyText className={cx(hasGreyText && elHasGreyText, bold && elIsBoldText, italic && elIsItalicText)} {...rest}>
      {children}
    </ElBodyText>
  )
}

export const SmallText: FC<ITypographyProps> = ({ hasGreyText, children, bold, italic, ...rest }) => {
  return (
    <ElSmallText className={cx(hasGreyText && elHasGreyText, bold && elIsBoldText, italic && elIsItalicText)} {...rest}>
      {children}
    </ElSmallText>
  )
}
