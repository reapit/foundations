import { styled } from '@linaria/react'
import { isMobile, isTablet } from '../../../styles/media'
import { elHFull } from '../../../styles/sizing'
import { css } from '@linaria/core'

export const elHasGreyBackground = css``
export const elHasMaxWidth = css``

export const ElMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow-y: visible;
  overflow-x: hidden;
  background: var(--color-white);

  &.${elHasGreyBackground} {
    background: var(--color-grey-50);
  }

  &.${elHasMaxWidth} {
    max-width: 1200px;
    margin: 0 auto;
  }
`

export const ElPageContainer = styled.section`
  display: block;
  padding: 0.5rem 1.25rem;
  width: 100%;
  height: calc(100vh - 56px);
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: var(--color-white);

  ${isTablet} {
    padding: 2.5rem 1.5rem;
  }

  &.${elHFull} {
    height: 100%;
  }

  &.${elHasGreyBackground} {
    background: var(--color-grey-50);
  }

  &.${elHasMaxWidth} {
    max-width: 1200px;
    margin: 0 auto;
  }
`

export const ElSecondaryNavContainer = styled.aside`
  display: block;
  width: 14rem;
  flex: 0 0 14rem;
  padding: 1.5rem;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  background: var(--color-white);
  border-right: 1px solid var(--color-grey-50);

  &::-webkit-scrollbar {
    display: none;
  }

  ${isMobile} {
    display: none;
  }
`

export const ElMolecule = styled.div`
  display: block;
  padding: 0.75rem;
  margin-bottom: 1.25rem;
  width: 100%;
`

export const ElFlexContainer = styled.div`
  display: flex;
  min-height: 0;
  min-width: 0;

  &.${elHasGreyBackground} {
    background: var(--color-grey-50);
  }

  &.${elHasMaxWidth} {
    max-width: 1200px;
    margin: 0 auto;
  }
`
