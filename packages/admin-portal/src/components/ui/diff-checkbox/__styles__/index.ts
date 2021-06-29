import { css } from '@linaria/core'
import { BLACK, GREY, GREY_LIGHT, GREEN_LIGHTER, RED_LIGHTER } from '@/core/__styles__/colors'

export const checkboxContainer = css`
  background-color: ${GREY_LIGHT};
  border: 1px solid ${GREY_LIGHT};
  border-radius: 3px;
  padding: 10px;
  color: ${BLACK};
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

export const greenBackground = css`
  background-color: ${GREEN_LIGHTER};
`

export const redBackground = css`
  background-color: ${RED_LIGHTER};
`

export const arow = css`
  font-size: 18px;
  color: ${GREY};
`
