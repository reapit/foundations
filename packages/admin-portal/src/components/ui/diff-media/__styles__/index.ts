import { css } from '@linaria/core'
import { BLACK, GREY, GREY_LIGHT, RED_LIGHTER, GREEN_LIGHTER } from '../../../../core/__styles__/colors'

export const diffMediaContainer = css`
  background-color: ${GREY_LIGHT};
  border: 1px solid ${GREY_LIGHT};
  border-radius: 3px;
  padding: 10px;
  color: ${BLACK};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const image = css`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`

export const greenBackground = css`
  background-color: ${GREEN_LIGHTER};
`

export const redBackground = css`
  background-color: ${RED_LIGHTER};
`

export const diffBlock = css`
  border-radius: 4px;
  width: 88px;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const arrow = css`
  font-size: 18px;
  color: ${GREY};
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
