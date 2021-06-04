import { css } from 'linaria'
import { styled } from 'linaria/react'

export const ElNavContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  background-color: var(--color-blue-dark);
  height: 72px;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;
  overflow-x: scroll;
  overflow-y: hidden;

  @media screen and (min-width: 768px) {
    height: 100%;
    width: 80px;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
  }
`

export const ElNavItem = styled.div`
  font-family: var(--font-sans-serif);
  font-size: 12px;
  font-weight: bold;
  color: var(--color-white);
  width: 100%;
  display: flex;
  text-align: center;
  padding: 0.5rem;
  justify-content: middle;

  @media screen and (min-width: 768px) {
    flex-direction: column;
    justify-content: flex-end;
    height: 72px;
  }
`

export const elNavItemSecondary = css`
  margin-left: auto;

  @media screen and (min-width: 768px) {
    margin-top: auto;
  }
`
