import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { forMobileAndAbove, forTabletAndAbove } from '../../../core/__styles__/media'

export const htmlRender = css`
  font-family: var(--font-sans-serif);
  font-weight: normal;
  color: var(--color-black);
  font-size: var(--font-size-default);
  line-height: 1.25rem;
  letter-spacing: -1%;
  color: var(--color-grey-dark);

  ul,
  p,
  div {
    margin-bottom: 1rem;
  }
`

export const AppDetailWrapper = styled.div`
  margin-bottom: 0.75rem;
  margin-right: 0.75rem;
  border-radius: 0.25rem;
  background-color: var(--color-grey-light);
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${forMobileAndAbove} {
    width: 96px;
    height: 96px;
  }
`

export const AppDetailIcon = styled.img`
  border-radius: 1rem;
  width: 48px;
  height: 48px;

  ${forMobileAndAbove} {
    width: 72px;
    height: 72px;
  }
`

export const AppDetailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid var(--color-grey-medium);
`

export const AppDetailImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-grey-light);
  padding: 0.75rem;
  border-radius: 0.25rem;
`

export const AppDetailDescriptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 1.25rem;
  grid-row-gap: 1.25rem;
  margin-bottom: 1.25rem;

  ${forTabletAndAbove} {
    grid-template-columns: repeat(12, 1fr);
    grid-row-gap: 2.5rem;
    margin-bottom: 2.5rem;
  }
`

export const AppDetailDescriptionColMain = styled.div`
  grid-column-end: span 4;
  align-self: end;
  min-width: 0;

  ${forTabletAndAbove} {
    grid-column-end: span 7;
  }
`

export const AppDetailDescriptionColAside = styled.div`
  grid-column-end: span 4;
  align-self: start;
  min-width: 0;

  ${forTabletAndAbove} {
    grid-column-end: span 5;
    padding-top: 2.75rem;
  }
`

export const AppDetailBackButton = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  background-color: var(--color-grey-light);
  margin-bottom: 0.75rem;
  cursor: pointer;
`
