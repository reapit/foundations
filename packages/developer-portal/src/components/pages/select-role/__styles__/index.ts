import { styled } from '@linaria/react'
import { forTabletAndBelow } from '@/core/__styles__/media'

export const RegisterRoleTile = styled.div`
  width: 33.33%;
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
  width: 50%;
  padding: 2rem;
  pointer-events: auto;
  margin: 0 auto;

  img {
    max-width: 200px;
    margin: 0 auto;
    display: block;
  }

  ${forTabletAndBelow} {
    width: 100%;
  }
`

export const RegisterImageContainer = styled.div`
  background-color: var(--color-grey-white);
  width: 50%;
  height: 100vh;
  font-size: 0;

  ${forTabletAndBelow} {
    display: none;
  }
`
