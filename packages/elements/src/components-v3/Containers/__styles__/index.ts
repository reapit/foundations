import { styled } from 'linaria/react'
import { css } from 'linaria'

export const ElMainContainer = styled.main`
  display: flex;
  width: 100vw;
  height: 100%;
  overflow-y: visible;
  overflow-x: hidden;
  background: var(--color-grey-light);

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

export const ElPageContainer = styled.section`
  display: block;
  padding: 2rem 1.5rem;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: var(--color-white);

  @media screen and (max-width: 768px) {
    padding: 0.5rem 1.25rem;
  }
`

export const ElSecondaryNavContainer = styled.aside`
  display: block;
  width: 14rem;
  padding: 2rem 1.5rem;
  overflow-y: scroll;
  overflow-x: hidden;
  background: var(--color-grey-light);

  @media screen and (min-width: 767px) {
    display: none;
  }
`

export const ElAtom = styled.div``

export const ElMolecule = styled.div``

export const ElOrganisam = styled.div``

export const ElFlexContainer = styled.div`
  display: flex;
`

export const elHasBackground = css`
  background-color: var(--color-white);
`

export const elHasBoxShadow = css`
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
`

export const elHasBorder = css`
  border: 1px solid var(--color-grey-medium);
  border-radius: 4px;
`
