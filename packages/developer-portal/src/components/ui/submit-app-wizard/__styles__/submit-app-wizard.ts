import { css } from 'linaria'
import { greyMedium } from '../../../../core/__styles__/colors'

/** Use These css-s to make sure Authentication modal work on IE  **/
export const btnChooseAuthTypeContainer = css`
  clear: left;
  float: left;
  width: 100%;
  overflow: hidden;
  display: flex;

  > div {
    float: left;
    width: 100%;
    position: relative;
    right: 48%;
  }
`

export const btnChooseAuthTypeContainerLeft = css`
  float: left;
  width: 46%;
  position: relative;
  left: 50%;
  overflow: hidden;
  height: 100%;
`

export const btnChooseAuthTypeContainerRight = css`
  float: left;
  width: 46%;
  position: relative;
  left: 54%;
  overflow: hidden;
  height: 100%;
`

export const btnChooseAuthType = css`
  height: auto;
  text-transform: none;
  font-weight: 400;
  white-space: normal;
  height: 100%;
  border: 1px solid ${greyMedium};
  display: flex;
  flex-direction: column;
  text-align: center;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
`
