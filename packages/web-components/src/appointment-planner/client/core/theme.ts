/* istanbul ignore file */
import { injectGlobal } from 'emotion'

export interface InitializerTheme {
  hoverBackgroundColor?: string
}

export const injectGlobalCss = ({ hoverBackgroundColor }: InitializerTheme) => injectGlobal`
  :root {
    --cellSpacing: 2px;
    --hoverBackgroundColor: ${hoverBackgroundColor};
  }
`
