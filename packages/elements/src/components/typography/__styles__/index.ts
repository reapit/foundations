import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const elHasGreyText = css``

export const ElTitle = styled.h1`
  font-family: var(--font-sans-serif);
  font-weight: bold;
  color: var(--color-black);
  font-size: var(--font-size-heading);
  line-height: 2.25rem;
  letter-spacing: 0%;
  margin-bottom: 2rem;

  &.${elHasGreyText} {
    color: var(--color-grey-dark);
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
`

export const elIsBoldText = css`
  font-weight: bold;
`

export const elIsItalicText = css`
  font-style: italic;
`
