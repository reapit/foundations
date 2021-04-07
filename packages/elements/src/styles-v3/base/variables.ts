import { css } from 'linaria'

// export javascript colours for the SVG background in the button
export const intentPrimary = '#0061a8'
export const intentSecondary = '#23a4de'
export const intentCritical = '#f5b555'
export const intentSuccess = '#a0c862'
export const intentDanger = '#d3033d'

export const elVariables = css`
  :global() {
    :root {
      /* basic color variables */
      --color-white: #fff;
      --color-black: #000000;
      --color-grey-dark: #646464;
      --color-grey-medium: #e3e3e3;
      --color-grey-light: #f2f2f2;

      /** shades of blue color variables */
      --color-blue-light: #23a4de;
      --color-blue-light2: #7bc9eb;
      --color-blue-dark: #262f69;
      --color-blue-dark2: #31448f;

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
      --intent-primary-light-text: var(--color-grey-dark);
      --intent-secondary-light-text: var(--color-grey-dark);
      --intent-critical-light-text: var(--color-grey-dark);
      --intent-success-light-text: var(--color-grey-dark);
      --intent-danger-light-text: var(--color-grey-dark);

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
      --intent-danger-light-text: var(--color-white);

      /** font variables */
      --font-sans-serif: 'PT Sans', Helvetica, Arial, sans-serif;
      --font-monospace: 'Source Code Pro', monospace;

      /** font size variables */
      --font-size-heading-main: 2rem;
      --font-size-subheading-main: 1.8rem;
      --font-size-heading-secondary: 1.5rem;
      --font-size-subHeading-secondary: 1.2rem;
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
    }
  }
`
