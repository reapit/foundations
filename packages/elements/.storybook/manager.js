import addons from '@storybook/addons'
import { create } from '@storybook/theming'
import { version } from '../package.json'

addons.setConfig({
  theme: create({
    base: 'light',

    colorPrimary: '#262f69',
    colorSecondary: '#0061a8',

    // UI
    appBg: '#fff',
    appContentBg: '#fff',
    appBorderColor: '#95aac9',
    appBorderRadius: 0,

    // Typography
    fontBase: "'Inter', sans-serif",
    fontCode: 'monospace',

    // Text colors
    textColor: '#12263f',
    textInverseColor: '#fff',

    // Toolbar default and active colors
    barTextColor: '#556986',
    barSelectedColor: '#12263f',
    barBg: '#f9fbfd',

    // Form colors
    inputBg: '#fff',
    inputBorder: '#556986',
    inputTextColor: '#12263f',
    inputBorderRadius: 0,

    brandTitle: `Elements ${version}`,
  }),
})
