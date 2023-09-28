import { styled } from '@linaria/react'
import { forMobileOnly } from '../../../core/__styles__/media'

export const LoginContainer = styled.div`
  min-width: 100vw;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  background-color: var(--color-white);
  height: 100vh;
  overflow-y: auto;

  ${forMobileOnly} {
    flex-direction: column;
    justify-content: center;
  }
`

export const LoginRoleTile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 0.625rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-purple-50);
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const LoginContentWrapper = styled.div`
  background-color: var(--color-white);
  max-width: 25rem;
  pointer-events: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: auto;

  img {
    margin: 0 auto 3rem auto;
    display: block;
  }

  ${forMobileOnly} {
    width: 100%;
    margin: 0 auto;
  }
`

export const LoginImageContainer = styled.div`
  ${forMobileOnly} {
    display: none;
  }
`
