import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const TermsOl = styled.ol`
  list-style-type: none;
  counter-reset: item;
  margin: 0;
  padding: 0;
`

export const TermsLi = styled.li`
  display: table;
  counter-increment: item;
  margin-bottom: 0.6em;
  &:before {
    font-weight: 700;
    content: counters(item, '.');
    display: table-cell;
    width: 4rem;
  }
`

export const TermsLiAlpha = styled(TermsLi)`
  &:before {
    content: '(' counter(item, lower-alpha) ')';
  }
`

export const modalWidth = css`
  max-width: 1000px !important;
  top: 50% !important;
  height: 80vh !important;
  overflow: scroll;
`

export const TermsUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

export const TermsLiBullet = styled.li`
  display: table;
  margin-bottom: 0.6em;
  &:before {
    content: '.';
    font-weight: 700;
    display: table-cell;
    width: 4rem;
  }
`
