import { css } from 'linaria'
import { styled } from 'linaria/react'

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
    color: $black;
    content: counters(item, '.');
    display: table-cell;
    padding-right: 2em;
  }
`

export const TermsLiAlpha = styled(TermsLi)`
  &:before {
    content: '(' counter(item, lower-alpha) ')';
  }
`

export const modalWidth = css`
  @media only screen and (min-width: 1000px) {
    .modal-content,
    .modal-card {
      max-width: 940px;
      width: auto;
    }
  }

  @media only screen and (min-width: 1200px) {
    .modal-content,
    .modal-card {
      max-width: 1140px;
      width: auto;
    }
  }
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
    color: $black;
    display: table-cell;
    padding-right: 2em;
  }
`
