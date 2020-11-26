import { css } from 'linaria'
import { grey } from '../../../../core/__styles__/colors'

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

export const helperText = css`
  font-size: 1rem;
  color: ${grey};
`
