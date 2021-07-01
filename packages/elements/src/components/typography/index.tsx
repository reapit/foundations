import { cx } from 'linaria'
import * as React from 'react'
import { ElTitle, ElSubtitle, ElBodyText, ElSmallText, elHasGreyText, elIsBoldText, elIsItalicText } from './__styles__'

export interface ITypographyProps extends React.HTMLAttributes<HTMLElement> {
  hasGreyText?: boolean
  bold?: boolean
  italic?: boolean
}

export const Title: React.FC<ITypographyProps> = ({ hasGreyText, children, bold, italic, ...rest }) => {
  return (
    <ElTitle className={cx(hasGreyText && elHasGreyText, bold && elIsBoldText, italic && elIsItalicText)} {...rest}>
      {children}
    </ElTitle>
  )
}

export const Subtitle: React.FC<ITypographyProps> = ({ hasGreyText, children, bold, italic, ...rest }) => {
  return (
    <ElSubtitle className={cx(hasGreyText && elHasGreyText, bold && elIsBoldText, italic && elIsItalicText)} {...rest}>
      {children}
    </ElSubtitle>
  )
}

export const BodyText: React.FC<ITypographyProps> = ({ hasGreyText, children, bold, italic, ...rest }) => {
  return (
    <ElBodyText className={cx(hasGreyText && elHasGreyText, bold && elIsBoldText, italic && elIsItalicText)} {...rest}>
      {children}
    </ElBodyText>
  )
}

export const SmallText: React.FC<ITypographyProps> = ({ hasGreyText, children, bold, italic, ...rest }) => {
  return (
    <ElSmallText className={cx(hasGreyText && elHasGreyText, bold && elIsBoldText, italic && elIsItalicText)} {...rest}>
      {children}
    </ElSmallText>
  )
}

export * from './__styles__'
