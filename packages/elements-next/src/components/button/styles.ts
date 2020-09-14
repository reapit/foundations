import { css } from 'linaria'

export const elButton = css`
  background-color: #006580;
  color: var(--color-white, #fff);
  border-color: var(--color-grey-light, #dbdbdb);
  border-width: 1px;
  border-style: solid;
  cursor: pointer;
  justify-content: center;
  padding-bottom: calc(0.5em - 1px);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: calc(0.5em - 1px);
  text-align: center;
  white-space: nowrap;
  display: inline-block;
  border-radius: 0;
  text-transform: uppercase;
  font-size: var(--font-size-default, 1rem);
  font-weight: bold;
  padding: 0.7rem 0.9rem;
  height: auto;
  align-items: center;
  box-shadow: none;
  justify-content: flex-start;
  line-height: 1.5;
  position: relative;
  vertical-align: top;

  /* common status for all variants */

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  &:focus {
    outline: none;
  }
`

export const elButtonPrimary = css`
  background-color: var(--color-teal, #006580);
  color: var(--color-white, #fff);
  &:hover {
    background-color: #005b73;
  }
  &:active {
    background-color: #005167;
  }
`

export const elButtonSecondary = css`
  background-color: var(--color-white, #fff);
  color: #363636;
  &:hover,
  &:active {
    border-color: #74818d;
  }
`

export const elButtonDanger = css`
  background-color: var(--color-red, #d3033d);
  color: var(--color-white, #fff);
  &:hover {
    background-color: #c60339;
  }
  &:active {
    background-color: #ba0336;
  }
`

export const elButtonInfo = css`
  background-color: var(--color-blue, #0061a8);
  color: var(--color-white, #fff);
  &:hover {
    background-color: #209cd4;
  }
  &:active {
    background-color: #1e94c9;
  }
`

export const elButtonLoading = css`
  @keyframes spinAround {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  color: transparent !important;
  pointer-events: none;
  &::after {
    animation: spinAround 500ms infinite linear;
    border: 2px solid var(--color-grey-light, #dbdbdb);
    border-radius: 290486px;
    border-right-color: transparent;
    border-top-color: transparent;
    content: '';
    display: block;
    height: 1em;
    width: 1em;
    left: calc(50% - (1em / 2));
    top: calc(50% - (1em / 2));
    position: absolute !important;
    border-color: transparent transparent var(--color-white, #fff) var(--color-white, #fff) !important;
  }
`

export const elButtonGroup = css`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
`
