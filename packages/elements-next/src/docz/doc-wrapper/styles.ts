import { css } from 'linaria'

export const copyClipboardWrapper = css`
  position: relative;
  font-size: var(--font-size-default, 1rem);
  background: var(--color-grey-lightest, #f5f7f9);

  p {
    font-style: italic;
    color: var(--color-grey, #74818d);
    background: var(--color-grey-lightest, #f5f7f9);
  }

  svg {
    color: var(--color-grey, #74818d);
    position: absolute;
    right: var(--layout-size-base, 1rem);
    cursor: pointer;
  }
`
