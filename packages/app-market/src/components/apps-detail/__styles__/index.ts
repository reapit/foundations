import { forDesktopAndAbove } from './../../../core/__styles__/media'
import { ElModalBody } from './../../../../../elements/src/components/modal/__styles__/index'
import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { forMobileAndAbove, forTabletAndAbove, forWidescreenAndAbove } from '../../../core/__styles__/media'

export const htmlRender = css`
  font-family: var(--font-sans-serif);
  font-weight: normal;
  color: var(--color-black);
  font-size: var(--font-size-small);
  line-height: 1.25rem;
  letter-spacing: -1%;
  color: var(--color-grey-dark);

  ul,
  p,
  div {
    margin-bottom: 1rem;
  }

  ${forMobileAndAbove} {
    font-size: var(--font-size-default);
  }
`

export const AppDetailWrapper = styled.div`
  margin-right: 0.75rem;
  border-radius: 0.25rem;
  padding: 0.75rem;
  background-color: var(--color-grey-light);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.75rem;

  ${forMobileAndAbove} {
    width: 96px;
    height: 96px;
    margin-bottom: 0rem;
  }
`

export const AppDetailIcon = styled.img`
  border-radius: 0.25rem;
  width: 48px;
  height: 48px;

  ${forMobileAndAbove} {
    border-radius: 1rem;
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
  min-width: 0;

  ${forTabletAndAbove} {
    grid-column-end: span 7;
  }

  ${forWidescreenAndAbove} {
    grid-column-end: span 12;
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

  ${forWidescreenAndAbove} {
    display: none;
  }
`

export const AppDetailDescriptionAsideDesktop = styled.div`
  display: none;

  ${forWidescreenAndAbove} {
    display: block;
    margin-left: 1rem;
    margin-bottom: 1.25rem;
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
  margin-bottom: 1.25rem;
  cursor: pointer;
  margin-top: 0.75rem;

  ${forMobileAndAbove} {
    margin-top: 0;
  }
`

export const AppDetailPermissionChip = styled.div`
  background: var(--color-grey-light);
  color: var(--color-grey-dark);
  font-size: var(--font-size-small);
  border-radius: 1rem;
  padding: 0.25rem 0.625rem;
  margin: 0.25rem 0.5rem 0.25rem 0;
  display: inline-block;
`

export const AppDetailCategoryChip = styled.div`
  background: var(--color-grey-light);
  color: var(--color-black);
  font-size: var(--font-size-small);
  border-radius: 0.25rem;
  padding: 1px 0.5rem;
  margin-right: 0.75rem;
  display: inline-block;
`

export const appDetailVideoModal = css`
  width: 75vw;
  height: 75vh;
  max-width: 2000px;
  top: 50%;

  iframe {
    width: 100%;
    height: calc(100% - 5rem);
  }

  ${ElModalBody} {
    width: 100%;
    height: calc(100% - 2.5rem);
  }
`

export const appDetailInfoLineAdjust = css`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`

export const AppsDetailContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  ${forWidescreenAndAbove} {
    grid-template-columns: 1fr 2fr;
    grid-column-gap: 2rem;
  }
`

export const AppDetailSupportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1.5rem;

  ${forMobileAndAbove} {
    grid-column-gap: 2rem;
    grid-row-gap: 2.5rem;
  }
`

export const AppDetailSupportGridCol = styled.div`
  grid-column-end: span 12;

  ${forMobileAndAbove} {
    grid-column-end: span 6;
  }

  ${forDesktopAndAbove} {
    grid-column-end: span 4;
  }

  ${forWidescreenAndAbove} {
    grid-column-end: span 6;
  }
`
