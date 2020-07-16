import { css } from 'linaria'
import { colors } from './colors'
import { fontFamilies } from './fonts'

/* Below is a slimmed down version of of Normalize CSS plus some basic defaults */

export const globalStyles = css`
  :global() {
    /* @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Source+Code+Pro&display=swap'); */

    html {
      box-sizing: border-box;
      font-family: ${fontFamilies.default};
      color: ${colors.black};
      line-height: 1.15;
      -webkit-text-size-adjust: 100%;
    }

    *,
    *:before,
    *:after {
      font-family: inherit;
      color: inherit;
      box-sizing: inherit;
    }

    body {
      margin: 0;
    }

    main {
      display: block;
    }

    pre,
    code,
    kbd,
    samp {
      font-family: ${fontFamilies.monospace};
      font-size: 1rem;
    }

    a {
      background-color: transparent;
      color: ${colors.blue};
    }

    b,
    strong {
      font-weight: bold;
    }

    small {
      font-size: 80%;
    }

    img {
      border-style: none;
    }

    button,
    input,
    optgroup,
    select,
    textarea {
      font-family: inherit;
      font-size: 100%;
      line-height: 1.15;
      margin: 0;
    }

    button,
    input {
      overflow: visible;
    }

    button,
    select {
      text-transform: none;
    }

    button,
    [type='button'],
    [type='reset'],
    [type='submit'] {
      -webkit-appearance: button;
    }

    button::-moz-focus-inner,
    [type='button']::-moz-focus-inner,
    [type='reset']::-moz-focus-inner,
    [type='submit']::-moz-focus-inner {
      border-style: none;
      padding: 0;
    }

    button:-moz-focusring,
    [type='button']:-moz-focusring,
    [type='reset']:-moz-focusring,
    [type='submit']:-moz-focusring {
      outline: 1px dotted ButtonText;
    }

    textarea {
      overflow: auto;
    }

    [type='checkbox'],
    [type='radio'] {
      box-sizing: border-box;
      padding: 0;
    }

    [type='number']::-webkit-inner-spin-button,
    [type='number']::-webkit-outer-spin-button {
      height: auto;
    }

    [type='search'] {
      -webkit-appearance: textfield;
      outline-offset: -2px;
    }

    [type='search']::-webkit-search-decoration {
      -webkit-appearance: none;
    }

    ::-webkit-file-upload-button {
      -webkit-appearance: button;
      font: inherit;
    }

    details {
      display: block;
    }

    summary {
      display: list-item;
    }

    template {
      display: none;
    }

    [hidden] {
      display: none;
    }
  }
`
