import { css } from 'linaria'

export const appointmentTile = css`
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  border: 2px solid #fff;
  cursor: pointer;

  &:hover {
    border: 2px solid #e3e3e3;
  }
`

export const highlightTile = css`
  border: 2px solid #e3e3e3;
`
