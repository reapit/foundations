import React, { FC, HTMLAttributes, useMemo } from 'react'
import { cx } from '@linaria/core'
import {
  ElTitle,
  ElSubtitle,
  ElBodyText,
  ElSmallText,
  elHasGreyText,
  elHasBoldText,
  elHasItalicText,
  elHasRegularText,
  elHasNoMargin,
  elHasCenteredText,
  elHasSectionMargin,
  elHasDisabledText,
  elHasCapitalisedText,
  elHasMediumText,
  ElText2XL,
  ElText3XL,
  ElTextXL,
  ElTextL,
  ElTextSM,
  ElTextXS,
  ElText2XS,
  ElTextBase,
  elHasMargin,
  elHasUpperCasedText,
} from './__styles__'
import { Intent, getIntentClassName } from '../../helpers/intent'

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  hasGreyText?: boolean
  hasNoMargin?: boolean
  hasMargin?: boolean
  hasSectionMargin?: boolean
  hasBoldText?: boolean
  hasMediumText?: boolean
  hasItalicText?: boolean
  hasCenteredText?: boolean
  hasRegularText?: boolean
  hasDisabledText?: boolean
  hasCapitalisedText?: boolean
  hasUpperCasedText?: boolean
  intent?: Intent
}

const propsToClass = ({
  className,
  hasGreyText,
  hasItalicText,
  hasBoldText,
  hasRegularText,
  hasMediumText,
  hasNoMargin,
  hasMargin,
  hasSectionMargin,
  hasCenteredText,
  hasDisabledText,
  hasCapitalisedText,
  hasUpperCasedText,
  intent,
  children,
  ...rest
}: TypographyProps) => () => {
  const intentClass = intent ? getIntentClassName(intent) : null

  return {
    className: cx(
      className,
      hasGreyText && elHasGreyText,
      hasRegularText && elHasRegularText,
      hasBoldText && elHasBoldText,
      hasItalicText && elHasItalicText,
      hasMediumText && elHasMediumText,
      hasMargin && elHasMargin,
      hasNoMargin && elHasNoMargin,
      hasSectionMargin && elHasSectionMargin,
      hasCenteredText && elHasCenteredText,
      hasDisabledText && elHasDisabledText,
      hasCapitalisedText && elHasCapitalisedText,
      hasUpperCasedText && elHasUpperCasedText,
      intentClass,
    ),
    children,
    rest,
  }
}

export const Text3XL: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  return (
    <ElText3XL className={className} {...rest}>
      {children}
    </ElText3XL>
  )
}

export const Text2XL: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  return (
    <ElText2XL className={className} {...rest}>
      {children}
    </ElText2XL>
  )
}

export const TextXL: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  return (
    <ElTextXL className={className} {...rest}>
      {children}
    </ElTextXL>
  )
}

export const TextL: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  return (
    <ElTextL className={className} {...rest}>
      {children}
    </ElTextL>
  )
}

export const TextBase: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  return (
    <ElTextBase className={className} {...rest}>
      {children}
    </ElTextBase>
  )
}

export const TextSM: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  return (
    <ElTextSM className={className} {...rest}>
      {children}
    </ElTextSM>
  )
}

export const TextXS: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  return (
    <ElTextXS className={className} {...rest}>
      {children}
    </ElTextXS>
  )
}

export const Text2XS: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  return (
    <ElText2XS className={className} {...rest}>
      {children}
    </ElText2XS>
  )
}

export const Title: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  return (
    <ElTitle className={className} {...rest}>
      {children}
    </ElTitle>
  )
}

export const Subtitle: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  return (
    <ElSubtitle className={className} {...rest}>
      {children}
    </ElSubtitle>
  )
}

export const BodyText: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  return (
    <ElBodyText className={className} {...rest}>
      {children}
    </ElBodyText>
  )
}

export const SmallText: FC<TypographyProps> = (props) => {
  const { className, children, rest } = useMemo(propsToClass(props), [props])
  return (
    <ElSmallText className={className} {...rest}>
      {children}
    </ElSmallText>
  )
}
