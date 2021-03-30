import { css } from 'linaria'

export const container = css`
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`

export const loaderContainer = css`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const contentIsLoading = css`
  opacity: 0.75;
`

export const overflowUnset = css`
  overflow: unset !important;
`
