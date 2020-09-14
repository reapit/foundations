import { css } from 'linaria'
import { elVariablesCssStr } from '@/base/variables'

export const resetCssStr = `
  /* http://meyerweb.com/eric/tools/css/reset/
   v5.0.1 | 20191019
   License: none (public domain)
*/

  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  menu,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }
  body {
    line-height: 1;
  }
  menu,
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
`

/* Below is a slimmed down version of of Normalize CSS plus some basic defaults */
export const globalStyles = css`
  :global() {
    /* @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Source+Code+Pro&display=swap'); */

    ${resetCssStr}
    html {
      ${elVariablesCssStr}

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
        font-size: 1rem !important;
      }

      [data-testid='live-editor'] * {
        font-family: var(--font-monospace, '"Source Code Pro", monospace') !important;
        font-size: 1rem !important;
      }
    }
  }
`
