import { css } from 'linaria'
import { grey } from '@/core/__styles__/colors'

export const authenticationCodeWrap = css`
  padding: 8px;
  border: 1px solid ${grey};
  min-width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const authenticationCode = css`
  word-break: break-all;
  margin-bottom: 0 !important;
`

export const btnCopy = css`
  cursor: pointer;
  position: relative;
  color: #555;
  &:hover .tooltiptext {
    visibility: visible;
    opacity: 1;
  }
`

export const tooltiptext = css`
  top: -5px;
  bottom: auto;
  right: 128%;
  visibility: hidden;
  position: absolute;
  min-width: 80px;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.6s;
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent transparent #555;
  }
`
