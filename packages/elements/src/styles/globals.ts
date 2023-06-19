import { css } from '@linaria/core'

// export javascript colours for the SVG background in the button
export const intentPrimary = '#0061a8'
export const intentSecondary = '#23a4de'
export const intentCritical = '#ffb71b'
export const intentSuccess = '#a0c862'
export const intentDanger = '#d3033d'

export const colorBlueLight = '#23a4de'
export const colorBlueLight2 = '#7bc9eb'
export const colorBlueDark = '#262f69'
export const colorBlueDark2 = '#31448f'
export const colorAccentOrange = '#ffb71b'

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
      font-family: 'PT Sans', Helvetica, Arial, sans-serif;
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
      color: #0061a8;
    }

    strong {
      font-weight: bold;
    }

    :root {
      /* basic color variables */
      --color-white: #fff;
      --color-black: #000000;
      --color-grey-dark: #646464;
      --color-grey-medium: #e3e3e3;
      --color-grey-light: #f2f2f2;

      /** shades of blue color variables and accent colors */
      --color-blue-light: #23a4de;
      --color-blue-light2: #7bc9eb;
      --color-blue-dark: #262f69;
      --color-blue-dark2: #31448f;
      --color-accent-orange: #ffb71b;

      /** intent color variables */
      --intent-primary: #0061a8;
      --intent-secondary: #23a4de;
      --intent-critical: #ffb71b;
      --intent-success: #a0c862;
      --intent-danger: #d3033d;
      --intent-low: #f2f2f2;
      /* colors of text that would sit on top of the intent when used as a background */
      --intent-primary-text: var(--color-white);
      --intent-secondary-text: var(--color-white);
      --intent-critical-text: var(--color-white);
      --intent-success-text: var(--color-white);
      --intent-danger-text: var(--color-white);

      /** intent light color variables */
      --intent-primary-light: #d6dae9;
      --intent-secondary-light: #eaf5fc;
      --intent-critical-light: #ffefdd;
      --intent-success-light: #e3eed1;
      --intent-danger-light: #fbeaef;
      /* intent light text colors */
      --intent-primary-light-text: var(--color-black);
      --intent-secondary-light-text: var(--color-black);
      --intent-critical-light-text: var(--color-black);
      --intent-success-light-text: var(--color-black);
      --intent-danger-light-text: var(--color-black);

      /** intent dark color variables */
      --intent-primary-dark: var(--color-blue-dark);
      --intent-secondary-dark: #125370;
      --intent-critical-dark: #78592a;
      --intent-success-dark: #506331;
      --intent-danger-dark: #70001f;
      /* intent dark text colors */
      --intent-primary-dark-text: var(--color-white);
      --intent-secondary-dark-text: var(--color-white);
      --intent-critical-dark-text: var(--color-white);
      --intent-success-dark-text: var(--color-white);
      --intent-danger-dark-text: var(--color-white);

      /** font variables */
      --font-sans-serif: 'PT Sans', Helvetica, Arial, sans-serif;
      --font-monospace: 'Source Code Pro', monospace;

      /** font size variables */
      --font-size-heading: 2rem;
      --font-size-subheading: 1.25rem;
      --font-size-default: 1rem;
      --font-size-small: 0.875rem;

      /** layout size */
      --layout-size-base: 1rem;
      --layout-size-1_2: 0.5rem;
      --layout-size-1_4: 0.25rem;
      --layout-size-3_4: 0.75rem;
      --layout-size-1_3: calc(1rem / 3);
      --layout-size-2_3: calc(2rem / 3);
      --layout-size-2: 2rem;
      --layout-size-3: 3rem;

      /** other defaults */
      --default-border-radius: 0.25rem;

      /** component specific variables */
      --component-input-bg: var(--color-white);
      --component-input-focus-bg: var(--color-grey-light);
      --component-input-shadow: inset 0px -1px 0px #000000;
      --component-input-border-bottom: 1px solid var(--color-grey-medium);
      --component-input-border-bottom-focus: 1px solid #000000;
      --component-steps-gutter-width: 12px;
      --component-table-min-column-width: 3rem;

      /** Navigation specific variables */
      --nav-menu-background-dark: var(--color-blue-dark);
      --nav-menu-background-accent: var(--color-blue-dark2);
      --nav-menu-text: var(--color-white);
      --nav-menu-text-hover: var(--color-white);
      --nav-menu-icon-primary-accent: var(--color-white);
      --nav-menu-icon-secondary-accent: var(--intent-secondary);

      /** InfoGraphic variables */
      --info-graphic-accent-color-darkest: #415161; // Neutral 700
      --info-graphic-accent-color-dark: #607890; // Neutral 500
      --info-graphic-accent-color-med: #9faebc; // Neutral 300
      --info-graphic-accent-color-light: #e5e9ed; // Neutral 100
      --info-graphic-accent-color-lightest: #f2f4f6; // Neutral 50
      --info-graphic-accent-color-white: #fff; // White
      --info-graphic-accent-color-bright: #7bc9eb; // Secondary lightest blue
    }
  }
`
