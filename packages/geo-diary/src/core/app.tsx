import '../styles/index.scss'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Router from './router'
import { PortalProvider } from '@reapit/elements'
import store from './store'

const App = () => (
  <Provider store={store.reduxStore}>
    <PersistGate loading={null} persistor={store.persistor}>
      <PortalProvider>
        <Router />
      </PortalProvider>
    </PersistGate>
  </Provider>
)

export default App
