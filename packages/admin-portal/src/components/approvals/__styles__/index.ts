import { css } from '@linaria/core'

export const diffViewerContainer = css`
  background-color: var(--color-grey-light);
  border: 1px solid var(--color-grey-light);
  border-radius: 3px;
  padding: 10px;
  color: var(--color-black);

  span {
    overflow-wrap: break-word;
  }
`

export const greenBackground = css`
  background-color: var(--intent-success-light);
`

export const redBackground = css`
  background-color: var(--intent-danger-light);
`

export const checkboxContainer = css`
  background-color: var(--color-grey-light);
  border: 1px solid var(--color-grey-light);
  border-radius: 3px;
  padding: 10px;
  color: var(--color-black);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const checkboxWrap = css`
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  pointer-events: none;
`

export const arow = css`
  font-size: 18px;
  color: var(--color-grey-dark);
`

export const diffMediaContainer = css`
  background-color: var(--color-grey-light);
  border: 1px solid var(--color-grey-light);
  border-radius: 3px;
  padding: 10px;
  color: var(--color-black);
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const image = css`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

export const diffBlock = css`
  border-radius: 4px;
  width: 88px;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const iconBlock = css`
  width: 90px;
  height: 90px;
`

export const iconImage = css`
  width: 80px;
  height: 80px;
`

export const mediaBlock = css`
  width: 150px;
  height: 210px;
`

export const mediaImage = css`
  width: 140px;
  height: 200px;
`

export const diffHtmlContainer = css`
  background-color: var(--color-grey-light);
  border: 1px solid var(--color-grey-light);
  border-radius: 3px;
  padding: 10px;
  color: var(--color-black);
  display: flex;
  align-items: center;

  & a {
    color: var(--intent-secondary);
    font-weight: bold;
  }

  & ul,
  & ol {
    margin-top: 0;
    margin-left: 0;
    list-style-position: inside;

    & li div {
      display: inline-block;
    }
  }

  & p {
    margin: 1rem 0;
  }
`

export const arrow = css`
  font-size: 18px;
  color: var(--color-grey-dark);
`

export const diffRenderBlock = css`
  overflow-wrap: break-word;
  border-radius: 4px;
  width: 48%;
`
