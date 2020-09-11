import { css } from 'linaria'

/* Below is a slimmed down version of of Normalize CSS plus some basic defaults */
export const globalStyles = css`
  :global() {
    /* @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Source+Code+Pro&display=swap'); */
    html {
      --font-monospace: 'Source Code Pro', monospace;
      --font-default: 'Roboto', Helvetica, Arial, sans-serif;
      --color-black: #3b454e;
      --color-blue: #0061a8;
      box-sizing: border-box;
      font-family: var(--font-default);
      color: var(--color-black);
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
      font-family: var(--font-monospace);
      font-size: 1rem;
    }

    a {
      background-color: transparent;
      color: var(--color-blue);
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

    [data-testid='main-container'] {
      [data-testid='live-preview'] {
        padding: 0px;
      }

      [data-testid='playground'] {
      }

      [data-testid='live-editor'] * {
        font-family: var(--font-monospace, '"Source Code Pro", monospace') !important;
        font-size: 1rem !important;
      }
    }
  }
`
