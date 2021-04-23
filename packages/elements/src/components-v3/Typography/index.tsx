import * as React from 'react'
import { ElTitle, ElSubtitle, ElBodyText, ElSmallText } from './__styles__'

export interface ITypographyProps extends React.HTMLAttributes<HTMLElement> {}

export const Title: React.FC<ITypographyProps> = ({ children, ...rest }) => {
  return <ElTitle {...rest}>{children}</ElTitle>
}

export const Subtitle: React.FC<ITypographyProps> = ({ children, ...rest }) => {
  return <ElSubtitle {...rest}>{children}</ElSubtitle>
}

export const BodyText: React.FC<ITypographyProps> = ({ children, ...rest }) => {
  return <ElBodyText {...rest}>{children}</ElBodyText>
}

export const SmallText: React.FC<ITypographyProps> = ({ children, ...rest }) => {
  return <ElSmallText {...rest}>{children}</ElSmallText>
}
