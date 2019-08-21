import '../styles/index.scss'
import * as React from 'react'
import { render } from 'react-dom'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import Toast from '../components/ui/toast'
import { PortalProvider } from '@reapit/elements'

const rootElement = document.querySelector('#root') as Element

const App = () => (
  <Provider store={store.reduxStore}>
    <PortalProvider>
      <Router />
    </PortalProvider>
    <Toast />
  </Provider>
)

if (rootElement) {
  render(<App />, rootElement)
}

export default App
