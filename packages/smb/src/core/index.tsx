import * as React from 'react'
import { render } from 'react-dom'
import Router from './router'

import { AuthProvider } from '@/context/auth-context'

import { createGlobalStyle } from 'styled-components'
import globalCss from 'raw-loader!@reapit/elements/dist/index.css'
const GlobalStyle = createGlobalStyle`
  ${globalCss};
  body {
    background-color: unset;
  }
`

const rootElement = document.querySelector('#root') as Element

const App = () => (
  <>
    <AuthProvider>
      <Router />
    </AuthProvider>

    <GlobalStyle />
  </>
)

if (rootElement) {
  render(<App />, rootElement)
}

export default App
