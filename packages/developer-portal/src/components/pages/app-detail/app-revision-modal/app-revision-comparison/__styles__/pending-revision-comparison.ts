import { css } from 'linaria'
import { grey, black, greyLight, greenLighter, redLighter, reapitMidblue } from '@/core/__styles__/colors'

export const container = css`
  background-color: ${greyLight};
  border: 1px solid ${greyLight};
  border-radius: 3px;
  padding: 10px;
  color: ${black};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const checkbox = css`
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  pointer-events: none;
`

export const green = css`
  background-color: ${greenLighter};
`

export const red = css`
  background-color: ${redLighter};
`

export const arrow = css`
  font-size: 18px;
  color: ${grey};
`

export const image = css`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

export const block = css`
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

export const diffRenderHtmlContainer = css`
  background-color: ${greyLight};
  border: 1px solid ${greyLight};
  border-radius: 3px;
  padding: 10px;
  color: ${black};
  display: flex;
  align-items: center;

  & a {
    color: ${reapitMidblue};
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

export const diffRenderBlock = css`
  overflow-wrap: break-word;
  border-radius: 4px;
  // 4% space for arrow
  width: 48%;
`

export const diffViewerContainer = css`
  background-color: ${greyLight};
  border: 1px solid ${greyLight};
  border-radius: 3px;
  padding: 10px;
  color: ${black};

  span {
    overflow-wrap: break-word;
  }
`
