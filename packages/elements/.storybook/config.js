import '../src/styles/index.scss'
import { configure, addParameters } from '@storybook/react'
import { create } from '@storybook/theming'
// Taking out logo for now so can be embedded more easily
// import logo from './logo.png'

addParameters({
  options: {
    theme: create({
      base: 'light',

      colorPrimary: '#262f69',
      colorSecondary: '#0061a8',

      // UI
      appBg: '#fff',
      appContentBg: '#f9fbfd',
      appBorderColor: '#95aac9',
      appBorderRadius: 0,

      // Typography
      fontBase: '"Roboto", sans-serif',
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

      brandTitle: `Elements ${process.env.APP_VERSION}`,
      brandUrl: process.env.ELEMENTS_DOCUMENT_URL,
      brandImage: ''
    })
  }
})

configure([require.context('../src', true, /\.stories\.(tsx|mdx)$/)], module)
