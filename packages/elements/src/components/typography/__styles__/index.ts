import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const elHasGreyText = css``
export const elHasNoMargin = css``
export const elHasRegularText = css``
export const elHasBoldText = css``
export const elHasItalicText = css``
export const elHasCenteredText = css``
export const elHasSectionMargin = css``
export const elHasDisabledText = css``
export const elHasCapitalisedText = css``

export const ElTitle = styled.h1`
  font-family: var(--font-sans-serif);
  font-weight: 600;
  color: var(--color-black);
  font-size: var(--font-size-heading);
  line-height: 2.25rem;
  letter-spacing: 0%;
  margin-bottom: 2rem;

  &.${elHasGreyText} {
    color: var(--color-grey-dark);
  }

  &.${elHasDisabledText} {
    color: var(--color-grey-medium);

    a {
      color: var(--color-grey-medium);
    }
  }

  &.${elHasRegularText} {
    font-weight: normal;
  }

  &.${elHasItalicText} {
    font-style: italic;
  }

  &.${elHasNoMargin} {
    margin-bottom: 0;
  }

  &.${elHasSectionMargin} {
    margin-bottom: 3.75rem;
  }

  &.${elHasCenteredText} {
    text-align: center;
  }

  &.${elHasCapitalisedText} {
    text-transform: capitalize;
  }
`

export const ElSubtitle = styled.h2`
  font-family: var(--font-sans-serif);
  font-weight: normal;
  color: var(--color-black);
  font-size: var(--font-size-subheading);
  line-height: 1.5rem;
  letter-spacing: 0%;
  margin-bottom: 1.25rem;

  &.${elHasGreyText} {
    color: var(--color-grey-dark);
  }

  &.${elHasDisabledText} {
    color: var(--color-grey-medium);

    a {
      color: var(--color-grey-medium);
    }
  }

  &.${elHasBoldText} {
    font-weight: 600;
  }

  &.${elHasItalicText} {
    font-style: italic;
  }

  &.${elHasNoMargin} {
    margin-bottom: 0;
  }

  &.${elHasSectionMargin} {
    margin-bottom: 3.75rem;
  }

  &.${elHasCenteredText} {
    text-align: center;
  }

  &.${elHasCapitalisedText} {
    text-transform: capitalize;
  }
`

export const ElBodyText = styled.p`
  font-family: var(--font-sans-serif);
  font-weight: normal;
  color: var(--color-black);
  font-size: var(--font-size-default);
  line-height: 1.25rem;
  letter-spacing: -1%;
  margin-bottom: 1rem;

  &.${elHasGreyText} {
    color: var(--color-grey-dark);
  }

  &.${elHasDisabledText} {
    color: var(--color-grey-medium);

    a {
      color: var(--color-grey-medium);
    }
  }

  &.${elHasBoldText} {
    font-weight: 600;
  }

  &.${elHasItalicText} {
    font-style: italic;
  }

  &.${elHasNoMargin} {
    margin-bottom: 0;
  }

  &.${elHasSectionMargin} {
    margin-bottom: 3.75rem;
  }

  &.${elHasCenteredText} {
    text-align: center;
  }

  &.${elHasCapitalisedText} {
    text-transform: capitalize;
  }
`

export const ElSmallText = styled.p`
  font-family: var(--font-sans-serif);
  font-weight: normal;
  color: var(--color-black);
  font-size: var(--font-size-small);
  line-height: 1.125rem;
  letter-spacing: 0%;
  margin-bottom: 1rem;

  &.${elHasGreyText} {
    color: var(--color-grey-dark);
  }

  &.${elHasDisabledText} {
    color: var(--color-grey-medium);

    a {
      color: var(--color-grey-medium);
    }
  }

  &.${elHasBoldText} {
    font-weight: 600;
  }

  &.${elHasItalicText} {
    font-style: italic;
  }

  &.${elHasNoMargin} {
    margin-bottom: 0;
  }

  &.${elHasSectionMargin} {
    margin-bottom: 3.75rem;
  }

  &.${elHasCenteredText} {
    text-align: center;
  }

  &.${elHasCapitalisedText} {
    text-transform: capitalize;
  }
`
