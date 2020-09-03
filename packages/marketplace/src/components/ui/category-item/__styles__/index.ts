import { css } from 'linaria'
import { black } from '@/core/__styles__/colors'

export const categoryItem = css`
  display: inline;
  margin: 4px;

  a {
    color: #262f69;
    cursor: pointer;
    text-decoration: none;
    font-weight: normal;
  }

  &:hover {
    text-decoration: underline;
  }

  @media screen and (min-width: 769px) {
    display: block;
    margin: 4px;
  }
`

export const categoryItemActive = css`
  a {
    color: ${black};
    font-weight: 700;
  }
`
