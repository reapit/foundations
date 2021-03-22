import { css } from 'linaria'

const iconWidth = 80
const iconHeight = 80

export const container = css`
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: center;

  @media (min-width: 400px) {
    width: 33%;
  }

  @media (min-width: 600px) {
    width: 25%;
  }
`

export const wrapIcon = css`
  width: ${iconWidth}px;
  height: ${iconHeight}px;
  cursor: pointer;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  box-shadow: 2px 4px 20px rgb(0 0 0 / 5%);
`
export const icon = css`
  width: ${iconWidth - 30}px;
  max-height: ${iconHeight - 30}px;
`
export const appTitle = css`
  width: ${iconWidth * 1.5}px;
  white-space: nowrap;
  margin-top: 1rem;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 16px;
  font-weight: bold;
`
export const content = css`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  max-width: 700px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 4.25rem;
`
