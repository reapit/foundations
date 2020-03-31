import { injectGlobal } from 'emotion'

export interface InitializerTheme {
  hoverBackgroundColor?: string
}

export const generateGlobalTheme = ({ hoverBackgroundColor }: InitializerTheme) => injectGlobal`
  :root {
    --cellSpacing: 2px;
    --hoverBackgroundColor: ${hoverBackgroundColor};
  }
`
