import { css } from 'linaria'

export const contentIsLoading = css`
  opacity: 0.75;
`

export const wrapList = css`
  display: flex;
  flex-wrap: wrap;
  justify-items: center;
  justify-content: flex-start;
  align-items: center;

  & > * {
    margin-bottom: 1rem;
  }
`

export const isLoading = css``
