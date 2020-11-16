import { reapitRed } from '@/core/__styles__/colors'
import { css } from 'linaria'
import { styled } from 'linaria/react'

export const Warn = styled.h5`
  color: ${reapitRed} !important;
  text-align: center;
`

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
  .modal-content,
  .modal-card {
    max-width: 1000px;
    width: auto;
    padding: 0 2rem;
  }
`

export const TermsUl = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  /* counter-reset: item; */
  /* > li  */
  /* schedule-parent > li {
      &:before {
        content: counters(ul-item, '.') ' ';
      }
    } */
  /* } */
`

export const TermsLiBullet = styled.li`
  display: table;
  margin-bottom: 0.6em;
  /* counter-increment: item; */
  &:before {
    content: '.';
    font-weight: 700;
    color: $black;
    display: table-cell;
    padding-right: 2em;
  }
`
