import { styled } from '@linaria/react'

export const LoginContainer = styled.div`
  min-width: 100vw;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  background: url('./login-bg.svg') left center no-repeat;
  background-size: cover;
  height: 100vh;
  overflow-y: auto;

  @media (max-width: 768px) {
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

export const LoginContentWrapper = styled.div`
  max-width: 27rem;
  pointer-events: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: auto;
  background-color: var(--color-white);
  padding: 2rem;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 0.25rem;

  img {
    margin: 0 auto 3rem auto;
    display: block;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
  }
`
