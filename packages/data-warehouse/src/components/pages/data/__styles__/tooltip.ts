import { css } from 'linaria'
import { grey } from '../../../../styles/colors'

export const btnCopy = css`
  cursor: pointer;
  position: relative;
  color: ${grey};
  &:hover span {
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
  background-color: ${grey};
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
    border-color: transparent transparent transparent ${grey};
  }
`
