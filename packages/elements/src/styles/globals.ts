import { css } from '@linaria/core'

// export javascript colours for the SVG background in the button
export const intentPrimary = '#0080ff'
export const intentSecondary = '#66b2ff'
export const intentCritical = '#ffa000'
export const intentSuccess = '#20c040'
export const intentDanger = '#f01830'

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
      font-family: 'Roboto', Helvetica, Arial, sans-serif;
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
      color: #0080ff; // Blue 500
    }

    strong {
      font-weight: bold;
    }

    :root {
      /* basic color variables */
      --color-white: #fff;
      --color-black: #222b33; // Neutral 900
      --color-grey-darkest: #415161; // Neutral 700
      --color-grey-dark: #607890; // Neutral 500
      --color-grey-medium: #798da1; // Neutral 400
      --color-grey-medium-light: #9faebc; // Neutral 300
      --color-grey-light: #e5e9ed; // Neutral 100
      --color-grey-lightest: #ebf5ff; // Neutral 50

      /** shades of blue color variables and accent colors */
      --color-accent-blue: #0080ff; // Blue 500
      --color-accent-blue-light: #66b2ff; // Blue 300
      --color-accent-blue-lightest: #ebf5ff; // Blue 50
      --color-accent-blue-dark: #0056ad; // Blue 700
      --color-accent-yellow: #ffa000; // Yellow 500
      --color-accent-yellow-light: #ffc666; // Yellow 300
      --color-accent-yellow-dark: #ad6c00; // Yellow 700
      --color-accent-orange: #ff6000; // Orange 500
      --color-accent-orange-light: #ff9f66; // Orange 300
      --color-accent-orange-dark: #ad4100; // Orange 700
      --color-accent-green: #20c040; // Green 500
      --color-accent-green-light: #79d98c; // Green 300
      --color-accent-green-dark: #15822b; // Green 700
      --color-accent-red: #f01830; // Red 500
      --color-accent-red-light: #f67482; // Red 300
      --color-accent-red-dark: #a21020; // Red 700
      --color-accent-purple: #8040ff; // Purple 500
      --color-accent-purple-light: #b28cff; // Purple 300
      --color-accent-purple-dark: #562bad; // Purple 700
      --color-accent-teal: #009b96; // Teal 500
      --color-accent-teal-light: #64d2c8; // Teal 300
      --color-accent-teal-dark: #00726e; // Teal 700

      /* Brand colors - defaults to primary */
      --color-brand: var(--color-accent-blue);
      --color-brand-light: var(--color-accent-blue-light);
      --color-brand-lightest: var(--color-accent-blue-lightest);
      --color-brand-dark: var(--color-accent-blue-dark);

      /* Blue light and dark are the same, have not removed to avoid breaking changes - accent blue should be used going forward */

      /** intent color variables */
      --intent-primary: var(--color-accent-blue);
      --intent-warning: var(--color-accent-orange);
      --intent-pending: var(--color-accent-yellow);
      --intent-success: var(--color-accent-green);
      --intent-danger: var(--color-accent-red);
      --intent-neutral: var(--color-grey-medium);
      --intent-primary-text: var(--color-white);
      --intent-secondary-text: var(--color-white);
      --intent-warning-text: var(--color-white);
      --intent-pending-text: var(--color-white);
      --intent-success-text: var(--color-white);
      --intent-danger-text: var(--color-white);

      /* intent light colors */
      --intent-primary-light: var(--color-accent-blue-light);
      --intent-warning-light: var(--color-accent-orange-light);
      --intent-pending-light: var(--color-accent-yellow-light);
      --intent-success-light: var(--color-accent-green-light);
      --intent-danger-light: var(--color-accent-red-light);
      --intent-primary-light-text: var(--color-black);
      --intent-secondary-light-text: var(--color-black);
      --intent-warning-light-text: var(--color-black);
      --intent-pending-light-text: var(--color-black);
      --intent-success-light-text: var(--color-black);
      --intent-danger-light-text: var(--color-black);

      /** intent dark colors */
      --intent-primary-dark: var(--color-accent-blue-dark);
      --intent-warning-dark: var(--color-accent-orange-dark);
      --intent-pending-dark: var(--color-accent-yellow-dark);
      --intent-success-dark: var(--color-accent-green-dark);
      --intent-danger-dark: var(--color-accent-red-dark);
      --intent-primary-dark-text: var(--color-white);
      --intent-secondary-dark-text: var(--color-white);
      --intent-warning-dark-text: var(--color-white);
      --intent-pending-dark-text: var(--color-white);
      --intent-success-dark-text: var(--color-white);
      --intent-danger-dark-text: var(--color-white);

      /** font variables */
      --font-sans-serif: 'Roboto', Helvetica, Arial, sans-serif;
      --font-monospace: 'Source Code Pro', monospace;

      /** font size variables */
      --font-size-heading: 2rem;
      --font-size-subheading: 1.25rem;
      --font-size-default: 0.9375rem;
      --font-size-small: 0.875rem;

      /** layout size */
      --layout-size-base: 1rem;
      --layout-size-molecule: 1.25rem;
      --layout-size-atom: 0.75rem;

      /** other defaults */
      --default-border-radius: 0.25rem;

      /** component specific variables */
      --component-input-bg: var(--color-white);
      --component-input-focus-bg: var(--color-grey-light);
      --component-input-shadow: inset 0px -1px 0px #000000;
      --component-input-border-bottom: 1px solid var(--color-grey-light);
      --component-input-border-bottom-focus: 1px solid #000000;
      --component-steps-gutter-width: 12px;
      --component-table-min-column-width: 3rem;

      /** Navigation specific variables */
      --nav-menu-background-dark: var(--color-white);
      --nav-menu-background-accent: var(--color-white);
      --nav-menu-text: var(--color-grey-medium);
      --nav-menu-text-hover: var(--color-grey-dark);
      --nav-menu-icon-primary-accent: #506478; // Neutral 600
      --nav-menu-icon-secondary-accent: #798da1; // Neutral 400

      /** InfoGraphic variables */
      --info-graphic-accent-color-darkest: #222b33; // Neutral 900
      --info-graphic-accent-color-dark: #415161; // Neutral 700
      --info-graphic-accent-color-med: #506478; // Neutral 600
      --info-graphic-accent-color-light: #798da1; // Neutral 400
      --info-graphic-accent-color-lightest: #798da1; // Neutral 400
      --info-graphic-accent-color-white: #fff; // White
      --info-graphic-accent-color-bright: #d6eaff; // Blue 100

      /** To deprecated, left in to avoid breaking changes, some duplication */
      --color-blue-light: var(--color-accent-blue-light);
      --color-blue-light2: var(--color-accent-blue-light);
      --color-blue-dark: var(--color-accent-blue-dark);
      --color-blue-dark2: var(--color-accent-blue-dark);
      --intent-low: var(--color-grey-light);
      --intent-secondary: var(--color-accent-blue);
      --intent-secondary-light: var(--color-accent-blue-light);
      --intent-secondary-dark: var(--color-accent-blue-dark);
      --intent-critical: var(--color-accent-orange);
      --intent-critical-text: var(--color-white);
      --intent-critical-light: var(--color-accent-orange-light);
      --intent-critical-light-text: var(--color-black);
      --intent-critical-dark: var(--color-accent-orange-dark);
      --intent-critical-dark-text: var(--color-white);
      --layout-size-1_2: 0.5rem;
      --layout-size-1_4: 0.25rem;
      --layout-size-3_4: 0.75rem;
      --layout-size-1_3: calc(1rem / 3);
      --layout-size-2_3: calc(2rem / 3);
      --layout-size-2: 2rem;
      --layout-size-3: 3rem;
    }
  }
`
