import { css } from 'linaria'
import { reapitRed } from '@/core/__styles__/colors'

export const headingParagraph = css`
  margin-bottom: 0.6em;
`

export const subTitle = css`
  margin-bottom: 0.6em;
`

export const warn = css`
  color: ${reapitRed};
`

export const termsParent = css`
  list-style-type: none;
  counter-reset: item;
  margin: 0;
  padding: 0;
  > .terms-child {
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
    &.child-with-alpha-bullet {
      &:before {
        content: '(' counter(item, lower-alpha) ')';
      }
    }
    /* [class*='terms-parent'] {
      > .terms-child {
        &:before {
          content: counters(item, '.') ' ';
        }
        &.child-with-alpha-bullet {
          &:before {
            content: '(' counter(item, lower-alpha) ')';
          }
        }
      }
    } */
  }
`
