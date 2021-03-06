import { css } from 'linaria'

export const elCheckbox = css`
  input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;

    & + label {
      position: relative;
      cursor: pointer;
      padding: 0;
      color: var(--color-grey, #74818d);
    }

    // Box.
    & + label:before {
      content: '';
      margin-right: 1rem;
      display: inline-block;
      vertical-align: middle;
      width: 1.6rem;
      height: 1.6rem;
      background: white;
      border: 1px solid var(--color-grey, #74818d);
    }

    // Box hover
    &:hover + label:before {
      background: var(--color-teal, #006580);
      border-color: var(--color-teal, #006580);
    }

    // Box focus
    label:before {
      box-shadow: 0 0 0 1px var(--color-grey, #74818d);
    }

    // Box checked
    &:checked + label:before {
      background: var(--color-teal, #006580);
      border-color: var(--color-teal, #006580);
    }

    &:disabled + label {
      color: #b8b8b8;
      cursor: auto;
    }

    &:disabled + label:before {
      box-shadow: none;
      background: #ddd;
    }

    // Checkmark
    &:checked + label:after {
      content: '';
      position: absolute;
      left: 8px;
      top: 11px;
      background: white;
      width: 2px;
      height: 2px;
      box-shadow: 2px 0 0 white, 4px 0 0 white, 4px -2px 0 white, 4px -4px 0 white, 4px -6px 0 white, 4px -8px 0 white;
      transform: rotate(45deg);
    }
  }
`
