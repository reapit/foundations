import { css } from 'linaria'

export const elIsFlexColumn = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  margin-bottom: auto;
`

export const elFlex = css`
  display: flex;
`

// Flex direction
export const elFlexRow = css`
  flex-direction: row;
`

export const elFlexRowReverse = css`
  flex-direction: row-reverse;
`

export const elFlexColumn = css`
  flex-direction: column;
`

export const elFlexColumnReverse = css`
  flex-direction: column-reverse;
`

// Flex wrap
export const elFlexWrap = css`
  flex-wrap: wrap;
`

export const elFlexNoWrap = css`
  flex-wrap: nowrap;
`

export const elFlexWrapReverse = css`
  flex-wrap: wrap-reverse;
`

// Flex
export const elFlex1 = css`
  flex: 1 1 0%;
`

export const elFlexAuto = css`
  flex: 1 1 auto;
`

export const elFlexInitial = css`
  flex: 0 1 auto;
`
export const elFlexNone = css`
  flex: none;
`

// Flex Grow
export const elFlexGrow0 = css`
  flex-grow: 0;
`

export const elFlexGrow = css`
  flex-grow: 1;
`

// Flex Shrink
export const elFlexShrink0 = css`
  flex-shrink: 0;
`

export const elFlexShrink = css`
  flex-shrink: 1;
`
