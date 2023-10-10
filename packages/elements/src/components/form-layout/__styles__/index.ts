import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { isDesktop, isWideScreen, isTablet, isSuperWideScreen } from '../../../styles/media'

export const elFormLayoutHasMargin = css``

export const ElFormLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;

  ${isTablet} {
    grid-column-gap: 1.25rem;
    grid-row-gap: 1.25rem;
  }

  ${isDesktop} {
    grid-template-columns: repeat(8, 1fr);
  }

  ${isWideScreen} {
    grid-template-columns: repeat(12, 1fr);
  }

  ${isSuperWideScreen} {
    grid-template-columns: repeat(16, 1fr);
  }

  &.${elFormLayoutHasMargin} {
    margin-bottom: 1.5rem;
  }
`

export const ElFormSectionDivider = styled.div`
  margin: 1.5rem 0;
  border-bottom: 1px solid var(--color-grey-100);
`

export const ElInputWrapSmall = styled.div`
  grid-column-end: span 2;
`

export const ElInputWrap = styled.div`
  grid-column-end: span 4;
`

export const ElInputWrapMed = styled.div`
  grid-column-end: span 4;

  ${isDesktop} {
    grid-column-end: span 8;
  }

  ${isWideScreen} {
    grid-column-end: span 8;
  }

  ${isSuperWideScreen} {
    grid-column-end: span 8;
  }
`

export const ElInputWrapFull = styled.div`
  grid-column-end: span 4;

  ${isDesktop} {
    grid-column-end: span 8;
  }

  ${isWideScreen} {
    grid-column-end: span 12;
  }

  ${isSuperWideScreen} {
    grid-column-end: span 16;
  }
`
