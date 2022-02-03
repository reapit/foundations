import { styled } from '@linaria/react'
import { forMobileOnly } from '@/core/__styles__/media'

export const RegisterContainer = styled.div`
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

export const RegisterRoleTile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 0.625rem;
  border-radius: 0.25rem;
  border: 1px solid var(--color-grey-light);
  cursor: pointer;
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.08);

  &:hover {
    border: 1px solid var(--intent-secondary);
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export const RegisterContentWrapper = styled.div`
  background-color: var(--color-white);
  max-width: 21rem;
  pointer-events: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: auto;

  img {
    width: 15rem;
    margin: 0 auto 6rem auto;
    display: block;
  }

  ${forMobileOnly} {
    width: 100%;
    margin: 0 auto;
  }
`

export const RegisterImageContainer = styled.div`
  ${forMobileOnly} {
    display: none;
  }
`
