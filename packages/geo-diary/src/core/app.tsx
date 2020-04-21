import '../styles/index.scss'
import React from 'react'
import { Provider } from 'react-redux'
import Router from './router'
import { PortalProvider } from '@reapit/elements'
import store from './store'

const App = () => (
  <Provider store={store.reduxStore}>
    <PortalProvider>
      <Router />
    </PortalProvider>
  </Provider>
)

export default App
