import { cx } from 'linaria'
import * as React from 'react'
import { ElTitle, ElSubtitle, ElBodyText, ElSmallText, elGrey, elIsBoldText, elIsItalicText } from './__styles__'

export interface ITypographyProps extends React.HTMLAttributes<HTMLElement> {
  grey?: boolean
  bold?: boolean
  italic?: boolean
}

export const Title: React.FC<ITypographyProps> = ({ grey, children, bold, italic, ...rest }) => {
  return (
    <ElTitle className={cx(grey && elGrey, bold && elIsBoldText, italic && elIsItalicText)} {...rest}>
      {children}
    </ElTitle>
  )
}

export const Subtitle: React.FC<ITypographyProps> = ({ grey, children, bold, italic, ...rest }) => {
  return (
    <ElSubtitle className={cx(grey && elGrey, bold && elIsBoldText, italic && elIsItalicText)} {...rest}>
      {children}
    </ElSubtitle>
  )
}

export const BodyText: React.FC<ITypographyProps> = ({ grey, children, bold, italic, ...rest }) => {
  return (
    <ElBodyText className={cx(grey && elGrey, bold && elIsBoldText, italic && elIsItalicText)} {...rest}>
      {children}
    </ElBodyText>
  )
}

export const SmallText: React.FC<ITypographyProps> = ({ grey, children, bold, italic, ...rest }) => {
  return (
    <ElSmallText className={cx(grey && elGrey, bold && elIsBoldText, italic && elIsItalicText)} {...rest}>
      {children}
    </ElSmallText>
  )
}

export * from './__styles__'
