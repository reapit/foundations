import { css } from 'linaria'

// Convenience classes to add standard 1px grey border
export const elBorderT = css`
  border-top: 1px solid var(--color-grey-light, '#dbdbdb');
`

export const elBorderB = css`
  border-bottom: 1px solid var(--color-grey-light, '#dbdbdb');
`

export const elBorderL = css`
  border-left: 1px solid var(--color-grey-light, '#dbdbdb');
`

export const elBorderR = css`
  border-right: 1px solid var(--color-grey-light, '#dbdbdb');
`

export const elBorder = css`
  border: 1px solid var(--color-grey-light, '#dbdbdb');
`

export const elBorderX = css`
  border-left: 1px solid var(--color-grey-light, '#dbdbdb');
  border-right: 1px solid var(--color-grey-light, '#dbdbdb');
`

export const elBorderY = css`
  border-top: 1px solid var(--color-grey-light, '#dbdbdb');
  border-bottom: 1px solid var(--color-grey-light, '#dbdbdb');
`
