import { css } from 'linaria'
import { fontFamilies } from './fonts'

/* Some style overrides for the docs - need to style with attrs because uses CSS modules
 * not to include in the main bundle*/

export const docsGlobalStyles = css`
  :global() {
    [data-testid='main-container'] {
      [data-testid='live-preview'] {
        padding: 0px;
      }

      [data-testid='playground'] {
      }

      [data-testid='live-editor'] * {
        font-family: ${fontFamilies.monospace} !important;
        font-size: 1rem !important;
      }
    }
  }
`
