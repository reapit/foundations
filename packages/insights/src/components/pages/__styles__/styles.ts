import { styled } from '@linaria/react'

export const LoginContainer = styled.div`
  min-width: 100vw;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  background-color: var(--color-white);
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

  @media (max-width: 768px) {
    width: 100%;
    margin: 0 auto;
  }
`

export const LoginImageContainer = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`

export const MetabaseContainer = styled.div`
  height: 100%;
`

export const ControlsContainer = styled.div`
  background-color: #fff;
  width: 100%;
`
