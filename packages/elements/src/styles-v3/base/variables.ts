import { css } from 'linaria'

// export javascript colours for the SVG background in the button
export const intentPrimary = '#0061a8'
export const intentSecondary = '#23a4de'
export const intentCritical = '#f5b555'
export const intentSuccess = '#a0c862'
export const intentDanger = '#d3033d'

export const colorBlueLight = '#23a4de'
export const colorBlueLight2 = '#7bc9eb'
export const colorBlueDark = '#262f69'
export const colorBlueDark2 = '#31448f'
export const colorAccentOrange = '#ffb71b'

export const elVariables = css`
  :global() {
    :root {
      /* basic color variables */
      --color-white: #fff;
      --color-black: #000000;
      --color-grey-dark: #646464;
      --color-grey-medium: #e3e3e3;
      --color-grey-light: #f2f2f2;

      /** shades of blue color variables and accent colors */
      --color-blue-light: ${colorBlueLight};
      --color-blue-light2: ${colorBlueLight2};
      --color-blue-dark: ${colorBlueDark};
      --color-blue-dark2: ${colorBlueDark2};
      --color-accent-orange: ${colorAccentOrange};

      /** intent color variables */
      --intent-primary: ${intentPrimary};
      --intent-secondary: ${intentSecondary};
      --intent-critical: ${intentCritical};
      --intent-success: ${intentSuccess};
      --intent-danger: ${intentDanger};
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
      --component-steps-gutter-width: 12px;
      --component-table-min-column-width: 3rem;
      --component-table-narrow-version-limit-default: 700px;
    }
  }
`
