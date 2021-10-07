import { styled } from '@linaria/react'
import { isDesktop, isWideScreen, isTablet, isSuperWideScreen } from '../../../styles/media'

export const ElFormLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1.5rem;

  ${isTablet} {
    grid-column-gap: 2rem;
    grid-row-gap: 2.5rem;
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
