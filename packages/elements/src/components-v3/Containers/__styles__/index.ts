import { styled } from 'linaria/react'

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

export const ElMolecule = styled.div`
  display: block;
  padding: 0.75rem;
  margin-bottom: 1.25rem;
`

export const ElFlexContainer = styled.div`
  display: flex;
`
