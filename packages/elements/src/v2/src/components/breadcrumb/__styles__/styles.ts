import { css } from 'linaria'

export const breadcrumItem = css`
  & > * {
    font-size: 0.875rem;
    &:hover {
      color: #23a4de;
      cursor: pointer;
    }
    & > * {
      color: #7c8ca2;
    }
  }
  & > span {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
  }
  & > a {
    color: #7c8ca2;
    text-decoration: none;
    &:hover {
      color: #23a4de;
      cursor: pointer;
    }
  }
`

export const bold = css`
  font-weight: bold;
`
