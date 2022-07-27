import React, { FC, HTMLAttributes } from 'react'
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
} from './__styles__'

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  hasGreyText?: boolean
  hasNoMargin?: boolean
  hasSectionMargin?: boolean
  hasBoldText?: boolean
  hasItalicText?: boolean
  hasCenteredText?: boolean
  hasRegularText?: boolean
  hasDisabledText?: boolean
  hasCapitalisedText?: boolean
}

export const Title: FC<TypographyProps> = ({
  className,
  hasGreyText,
  children,
  hasItalicText,
  hasRegularText,
  hasNoMargin,
  hasSectionMargin,
  hasCenteredText,
  hasDisabledText,
  hasCapitalisedText,
  ...rest
}) => {
  return (
    <ElTitle
      className={cx(
        className,
        hasGreyText && elHasGreyText,
        hasRegularText && elHasRegularText,
        hasItalicText && elHasItalicText,
        hasNoMargin && elHasNoMargin,
        hasSectionMargin && elHasSectionMargin,
        hasCenteredText && elHasCenteredText,
        hasDisabledText && elHasDisabledText,
        hasCapitalisedText && elHasCapitalisedText,
      )}
      {...rest}
    >
      {children}
    </ElTitle>
  )
}

export const Subtitle: FC<TypographyProps> = ({
  className,
  hasGreyText,
  children,
  hasBoldText,
  hasItalicText,
  hasNoMargin,
  hasSectionMargin,
  hasCenteredText,
  hasDisabledText,
  hasCapitalisedText,
  ...rest
}) => {
  return (
    <ElSubtitle
      className={cx(
        className,
        hasGreyText && elHasGreyText,
        hasBoldText && elHasBoldText,
        hasItalicText && elHasItalicText,
        hasNoMargin && elHasNoMargin,
        hasSectionMargin && elHasSectionMargin,
        hasCenteredText && elHasCenteredText,
        hasDisabledText && elHasDisabledText,
        hasCapitalisedText && elHasCapitalisedText,
      )}
      {...rest}
    >
      {children}
    </ElSubtitle>
  )
}

export const BodyText: FC<TypographyProps> = ({
  className,
  hasGreyText,
  children,
  hasBoldText,
  hasItalicText,
  hasNoMargin,
  hasSectionMargin,
  hasCenteredText,
  hasDisabledText,
  hasCapitalisedText,
  ...rest
}) => {
  return (
    <ElBodyText
      className={cx(
        className,
        hasGreyText && elHasGreyText,
        hasBoldText && elHasBoldText,
        hasItalicText && elHasItalicText,
        hasNoMargin && elHasNoMargin,
        hasSectionMargin && elHasSectionMargin,
        hasCenteredText && elHasCenteredText,
        hasDisabledText && elHasDisabledText,
        hasCapitalisedText && elHasCapitalisedText,
      )}
      {...rest}
    >
      {children}
    </ElBodyText>
  )
}

export const SmallText: FC<TypographyProps> = ({
  className,
  hasGreyText,
  children,
  hasBoldText,
  hasItalicText,
  hasNoMargin,
  hasSectionMargin,
  hasCenteredText,
  hasDisabledText,
  hasCapitalisedText,
  ...rest
}) => {
  return (
    <ElSmallText
      className={cx(
        className,
        hasGreyText && elHasGreyText,
        hasBoldText && elHasBoldText,
        hasItalicText && elHasItalicText,
        hasNoMargin && elHasNoMargin,
        hasSectionMargin && elHasSectionMargin,
        hasCenteredText && elHasCenteredText,
        hasDisabledText && elHasDisabledText,
        hasCapitalisedText && elHasCapitalisedText,
      )}
      {...rest}
    >
      {children}
    </ElSmallText>
  )
}
