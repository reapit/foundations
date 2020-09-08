import { css } from 'linaria'

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
  button {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`

export const btnChooseAuthType = css`
  height: auto;
  text-transform: none;
  font-weight: 400;
  white-space: normal;
  height: 100%;
`
