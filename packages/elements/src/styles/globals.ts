import { css } from '@linaria/core'

// export javascript colours for the SVG background in the button
export const intentPrimary = '#4e56ea'
export const intentNeutral = '#0080ff'
export const intentSuccess = '#20c040'
export const intentPending = '#ffa000'
export const intentWarning = '#ff6000'
export const intentDanger = '#f01830'
export const intentDefault = '#607890'

// Deprecated - to remove in v5.
export const intentCritical = '##4e56ea'
export const intentSecondary = '#4e56ea'

export const elGlobals = css`
  :global() {
    /* Reset CSS */
    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
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
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
      line-height: 1.2;
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
    menu,
    nav,
    section {
      display: block;
    }
    body {
      line-height: 1;
    }
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

    /* Some basic defaults */

    html {
      font-size: 16px;
      font-family: 'Inter', Helvetica, Arial, sans-serif;
      color: #222b33; // Neutral 900
      height: 100%;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      overflow: hidden;

      * {
        box-sizing: border-box;
        letter-spacing: -0.01em;
      }
    }

    body {
      height: 100%;
    }

    a {
      text-decoration: none;
      cursor: pointer;
      color: #4e56ea; // Purple 500
    }

    strong {
      font-weight: bold;
    }

    :root {
      /* Root color pallet */

      /* Greys */
      --color-grey-900: #222b33;
      --color-grey-800: #323e4b;
      --color-grey-700: #415161;
      --color-grey-600: #506478;
      --color-grey-500: #607890;
      --color-grey-400: #798da1;
      --color-grey-300: #9faebc;
      --color-grey-200: #c5ced6;
      --color-grey-150: #d8dee4;
      --color-grey-100: #e5e9ed;
      --color-grey-50: #f2f4f6;

      /* Purples */
      --color-purple-900: #262884;
      --color-purple-800: #3632a6;
      --color-purple-700: #4036c8;
      --color-purple-600: #4844da;
      --color-purple-500: #4e56ea;
      --color-purple-400: #5a73fd;
      --color-purple-300: #7e9bfa;
      --color-purple-200: #b0c6fa;
      --color-purple-100: #d4e1ff;
      --color-purple-50: #ecf3ff;

      /* Blues */
      --color-blue-900: #002e5c;
      --color-blue-800: #004285;
      --color-blue-700: #0056ad;
      --color-blue-600: #006bd6;
      --color-blue-500: #0080ff;
      --color-blue-400: #2994ff;
      --color-blue-300: #66b2ff;
      --color-blue-200: #a3d1ff;
      --color-blue-100: #d6eaff;
      --color-blue-50: #ebf5ff;

      /* Greens */
      --color-green-900: #0b4517;
      --color-green-800: #106421;
      --color-green-700: #15822b;
      --color-green-600: #1aa135;
      --color-green-500: #20c040;
      --color-green-400: #43ca5e;
      --color-green-300: #79d98c;
      --color-green-200: #aee8ba;
      --color-green-100: #dbf4e0;
      --color-green-50: #edfaf0;

      /* Yellows */
      --color-yellow-900: #5c3900;
      --color-yellow-800: #855300;
      --color-yellow-700: #ad6c00;
      --color-yellow-600: #d68600;
      --color-yellow-500: #ffa000;
      --color-yellow-400: #ffaf29;
      --color-yellow-300: #ffc666;
      --color-yellow-200: #ffdca3;
      --color-yellow-100: #ffefd6;
      --color-yellow-50: #fff7eb;

      /* Oranges */
      --color-orange-900: #5c2200;
      --color-orange-800: #853200;
      --color-orange-700: #ad4100;
      --color-orange-600: #d65000;
      --color-orange-500: #ff6000;
      --color-orange-400: #ff7929;
      --color-orange-300: #ff9f66;
      --color-orange-200: #ffc5a3;
      --color-orange-100: #ffe5d6;
      --color-orange-50: #fff2eb;

      /* Reds */
      --color-red-900: #560811;
      --color-red-800: #7d0c19;
      --color-red-700: #a21020;
      --color-red-600: #c91428;
      --color-red-500: #f01830;
      --color-red-400: #f23d51;
      --color-red-300: #f67482;
      --color-red-200: #f9abb4;
      --color-red-100: #fcd9dd;
      --color-red-50: #fdecee;

      /* Neutral color variables */
      --color-white: #fff;
      --color-black: var(--color-grey-900);
      --color-grey-darkest: var(--color-grey-700);
      --color-grey-dark: var(--color-grey-500);
      --color-grey-medium: var(--color-grey-400);
      --color-grey-medium-light: var(--color-grey-300);
      --color-grey-light: var(--color-grey-100);
      --color-grey-lightest: var(--color-grey-50);

      /** intent color variables */
      --intent-primary: var(--color-purple-500);
      --intent-neutral: var(--color-blue-500);
      --intent-success: var(--color-green-500);
      --intent-pending: var(--color-yellow-500);
      --intent-warning: var(--color-orange-500);
      --intent-danger: var(--color-red-500);
      --intent-default: var(--color-grey-500);

      /* intent light colors */
      --intent-primary-light: var(--color-purple-300);
      --intent-neutral-light: var(--color-blue-300);
      --intent-success-light: var(--color-green-300);
      --intent-pending-light: var(--color-yellow-300);
      --intent-warning-light: var(--color-orange-300);
      --intent-danger-light: var(--color-red-300);
      --intent-default-light: var(--color-grey-300);

      /* intent lightest colors */
      --intent-primary-lightest: var(--color-purple-50);
      --intent-neutral-lightest: var(--color-blue-50);
      --intent-success-lightest: var(--color-green-50);
      --intent-pending-lightest: var(--color-yellow-50);
      --intent-warning-lightest: var(--color-orange-50);
      --intent-danger-lightest: var(--color-red-50);
      --intent-default-lightest: var(--color-grey-50);

      /** intent dark colors */
      --intent-primary-dark: var(--color-purple-700);
      --intent-neutral-dark: var(--color-blue-700);
      --intent-success-dark: var(--color-green-700);
      --intent-pending-dark: var(--color-yellow-700);
      --intent-warning-dark: var(--color-orange-700);
      --intent-danger-dark: var(--color-red-700);
      --intent-default-dark: var(--color-grey-700);

      /** font variables */
      --font-sans-serif: 'Inter', Helvetica, Arial, sans-serif;
      --font-monospace: 'Source Code Pro', monospace;

      /** font size variables */
      --font-size-heading: 2rem;
      --font-size-subheading: 1.25rem;
      --font-size-default: 0.9375rem;
      --font-size-small: 0.875rem;
      --font-size-smallest: 0.8125rem;
      --font-weight-default: 400;
      --font-weight-medium: 500;
      --font-weight-bold: 600;

      /** layout size */
      --layout-size-base: 1rem;
      --layout-size-molecule: 1.25rem;
      --layout-size-atom: 0.75rem;

      /** other defaults */
      --default-border-radius: 0.25rem;

      /** component specific variables */
      --component-input-bg: var(--color-white);
      --component-input-focus-bg: var(--color-grey-light);
      --component-input-shadow: inset 0px -1px 0px var(--color-white);
      --component-input-border: 1px solid var(--color-grey-150);
      --component-input-border-focus: 1px solid var(--color-purple-500);
      --component-steps-gutter-width: 12px;
      --component-table-min-column-width: 3rem;

      /** Navigation specific variables */
      --nav-menu-background-dark: var(--color-white);
      --nav-menu-background-accent: var(--color-white);
      --nav-menu-text: var(--color-grey-medium);
      --nav-menu-text-hover: var(--color-grey-dark);
      --nav-menu-icon-primary-accent: var(--color-grey-600);
      --nav-menu-icon-secondary-accent: var(--color-grey-400);

      /** To deprecated, left in to avoid breaking changes, some duplication */
      --color-blue-light: var(--color-purple-300);
      --color-blue-light2: var(--color-purple-300);
      --color-blue-dark: var(--color-purple-700);
      --color-blue-dark2: var(--color-purple-700);
      --intent-low: var(--color-grey-light);
      --intent-secondary: var(--color-purple-500);
      --intent-secondary-light: var(--color-purple-300);
      --intent-secondary-dark: var(--color-purple-700);
      --intent-critical: var(--color-purple-500);
      --intent-critical-text: var(--color-white);
      --intent-critical-light: var(--color-purple-300);
      --intent-critical-light-text: var(--color-black);
      --intent-critical-dark: var(--color-purple-700);
      --intent-critical-dark-text: var(--color-white);
      --layout-size-1_2: 0.5rem;
      --layout-size-1_4: 0.25rem;
      --layout-size-3_4: 0.75rem;
      --layout-size-1_3: calc(1rem / 3);
      --layout-size-2_3: calc(2rem / 3);
      --layout-size-2: 2rem;
      --layout-size-3: 3rem;
      --component-input-border-bottom: 1px solid var(--color-grey-150);
      --component-input-border-bottom-focus: 1px solid #000000;
    }
  }
`
