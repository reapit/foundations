import { css } from '@linaria/core'
import { GREY, RED_LIGHTER, GREEN_LIGHTER, GREY_LIGHT, BLACK, REAPIT_MID_BLUE } from '@/core/__styles__/colors'

export const diffHtmlContainer = css`
  background-color: ${GREY_LIGHT};
  border: 1px solid ${GREY_LIGHT};
  border-radius: 3px;
  padding: 10px;
  color: ${BLACK};
  display: flex;
  align-items: center;

  & a {
    color: ${REAPIT_MID_BLUE};
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

export const greenBackground = css`
  background-color: ${GREEN_LIGHTER};
`

export const redBackground = css`
  background-color: ${RED_LIGHTER};
`
export const arrow = css`
  font-size: 18px;
  color: ${GREY};
`

export const diffRenderBlock = css`
  overflow-wrap: break-word;
  border-radius: 4px;
  /* 4% space for arrow */
  width: 48%;
`
