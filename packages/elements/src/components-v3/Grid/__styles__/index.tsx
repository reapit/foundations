import { styled } from 'linaria/react'

export const ElGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1.5rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 2rem;
    grid-row-gap: 2.5rem;
  }
`

export const ElCol = styled.div`
  grid-column-end: span 8;

  @media screen and (min-width: 768px) {
    grid-column-end: span 6;
  }

  @media screen and (min-width: 1024px) {
    grid-column-end: span 4;
  }

  @media screen and (min-width: 1400px) {
    grid-column-end: span 3;
  }
`
