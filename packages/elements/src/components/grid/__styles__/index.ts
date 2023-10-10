import { styled } from '@linaria/react'
import { is4KScreen, isDesktop, isSuperWideScreen, isTablet, isWideScreen } from '../../../styles/media'

export const ElGrid = styled.div`
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

  ${is4KScreen} {
    grid-template-columns: repeat(20, 1fr);
  }
`

export const ElCol = styled.div`
  grid-column-end: span 4;
`

export const ElColHalf = styled.div`
  grid-column-end: span 2;
`

export const ElColQuarter = styled.div`
  grid-column-end: span 1;
`

export const ElColSplit = styled.div`
  grid-column-end: span 4;

  ${isWideScreen} {
    grid-column-end: span 6;
  }

  ${isSuperWideScreen} {
    grid-column-end: span 8;
  }

  ${is4KScreen} {
    grid-column-end: span 10;
  }
`

export const ElGridThirds = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;

  ${isTablet} {
    grid-column-gap: 1.25rem;
    grid-row-gap: 1.25rem;
  }
`

export const ElColSplitThird = styled.div`
  grid-column-end: span 3;

  ${isDesktop} {
    grid-column-end: span 1;
  }
`

export const ElColSplitTwoThirds = styled.div`
  grid-column-end: span 3;

  ${isDesktop} {
    grid-column-end: span 2;
  }
`
