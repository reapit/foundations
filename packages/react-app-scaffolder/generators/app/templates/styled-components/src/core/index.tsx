import * as React from 'react'
import { render } from 'react-dom'
import { createGlobalStyle } from 'styled-components'
import { Provider } from 'react-redux'
import Router from './router'
import store from './store'
import globalCss from 'raw-loader!@reapit/elements/dist/index.css'

const rootElement = document.querySelector('#root') as Element

const GlobalStyle = createGlobalStyle`
  ${globalCss};
  body {
    background-color: unset;
  }
`

const App = () => (
  <>
    <GlobalStyle />
    <Provider store={store.reduxStore}>
      <Router />
    </Provider>
  </>
)

if (rootElement) {
  render(<App />, rootElement)
}

export default App
