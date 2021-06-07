import { css } from 'linaria'
import { styled } from 'linaria/react'

export const ElNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: var(--color-blue-dark);
  height: auto;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;
  overflow-x: scroll;
  overflow-y: hidden;

  @media screen and (min-width: 768px) {
    height: 100%;
    width: 80px;
    overflow-x: hidden;
    overflow-y: auto;
  }
`

export const ElNavItem = styled.a`
  font-family: var(--font-sans-serif);
  font-size: 12px;
  font-weight: bold;
  color: var(--color-white);
  display: flex;
  text-align: center;
  padding: 0.5rem;
  justify-content: flex-start;
  align-items: center;

  &:hover {
    color: var(--color-white);
    background-color: var(--color-blue-dark2);
  }

  @media screen and (min-width: 768px) {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    height: 72px;

    * {
      margin: 0 auto;
    }
  }
`

export const elNavItemSecondary = css`
  @media screen and (min-width: 768px) {
    margin-top: auto;
  }
`

export const elNavItemActive = css`
  color: var(--color-white);
  background-color: var(--color-blue-dark2);
`
