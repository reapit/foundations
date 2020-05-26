import { css } from 'linaria'

export const breadcrumbItem = css`
  font-size: 0.875rem;
  color: #7c8ca2;
  font-weight: normal;
  cursor: default;
  & > * {
    margin: 0 0.5rem;
    font-weight: normal;
    text-decoration: none;
    color: #7c8ca2;
    &:hover {
      color: #23a4de;
      cursor: pointer;
    }
  }
  & > * > * {
    font-weight: normal;
    text-decoration: none;
    color: #7c8ca2;
    &:hover {
      color: #23a4de;
      cursor: pointer;
    }
  }
`

export const bold = css`
  font-weight: bold;
  & > * {
    font-weight: bold;
  }
`

export const lastItem = css`
  color: #7c8ca2;
  cursor: default;
  &:hover {
    color: #7c8ca2;
    cursor: default;
  }
  & > * {
    color: #7c8ca2;
    cursor: default;
    &:hover {
      color: #7c8ca2;
      cursor: default;
    }
  }
`
