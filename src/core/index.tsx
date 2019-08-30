import '../styles/index.scss'
import * as React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Router from './router'
import { PortalProvider } from '@reapit/elements'
import store from './store'
import { register } from './service-worker'

const rootElement = document.querySelector('#root') as Element

const App = () => (
  <Provider store={store.reduxStore}>
    <PersistGate loading={null} persistor={store.persistor}>
      <PortalProvider>
        <Router />
      </PortalProvider>
    </PersistGate>
  </Provider>
)

if (rootElement) {
  render(<App />, rootElement)

  register()
}

export default App
