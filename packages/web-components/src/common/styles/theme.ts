import { css } from 'emotion'

export interface InitializerTheme {
  baseBackgroundColor?: string
}

export const generateGlobalTheme = ({ baseBackgroundColor }: InitializerTheme) =>
  css`
    background: ${baseBackgroundColor || 'red'};
  `
