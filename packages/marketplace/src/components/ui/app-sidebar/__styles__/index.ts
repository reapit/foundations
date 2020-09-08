import { css } from 'linaria'
import { white, grey } from '@/core/__styles__/colors'

export const sidebar = css`
  width: 100%;
  @media screen and (min-width: 769px) {
    width: 240px;
    min-width: 240px;
  }
`

export const sidebarWrap = css`
  background-color: ${white};
  padding: 1rem;
`

export const subHeading = css`
  border-bottom: 1px ${grey} solid;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  color: ${grey};
`

export const btnSearch = css`
  height: 100%;
  outline: none;
  background: transparent;
  border: none;
  cursor: pointer;
  pointer-events: initial;
`
