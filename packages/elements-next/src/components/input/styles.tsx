import { css } from 'linaria'

export const elInput = css`
  cursor: auto;
  height: auto;
  padding: 0.7rem 0.9rem;
  border-radius: 0;
  max-width: 100%;
  width: 100%;
  background-color: var(--color-white);
  color: #363636;
  align-items: center;
  box-shadow: none;
  display: inline-flex;
  font-size: 1rem;
  justify-content: flex-start;
  line-height: 1.5;
  border: 1px solid;
  outline: 0;
  border-color: var(--color-grey);

  p {
    font-size: 1em;
    font-weight: 400;
    line-height: 1.5;
  }
`

export const elInputHasIcon = css`
  input {
    padding-right: 2.5em;
  }
  position: relative;
`
export const elInputIcon = css`
  color: var(--color-grey-light);
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 2.5em;
  z-index: 4;
  right: 0;
  align-items: center;
  display: inline-flex;
  justify-content: center;
`

export const elInputErrorText = css`
  color: var(--color-danger);
`
