import { css } from '@linaria/core'
import { GREY_LIGHT, BLACK, GREEN_LIGHTER, RED_LIGHTER } from '@/core/__styles__/colors'

export const diffViewerContainer = css`
  background-color: ${GREY_LIGHT};
  border: 1px solid ${GREY_LIGHT};
  border-radius: 3px;
  padding: 10px;
  color: ${BLACK};

  span {
    overflow-wrap: break-word;
  }
`

export const greenBackground = css`
  background-color: ${GREEN_LIGHTER};
`

export const redBackground = css`
  background-color: ${RED_LIGHTER};
`
