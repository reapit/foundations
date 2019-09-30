import * as React from 'react'
import { render } from 'react-dom'
import { PortalProvider } from '@reapit/elements'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import '../styles/index.scss'

const rootElement = document.querySelector('#root') as Element

const App = () => (
  <Provider store={store.reduxStore}>
    <PortalProvider>
      <Router />
    </PortalProvider>
  </Provider>
)

if (rootElement) {
  render(<App />, rootElement)
}

export default App
