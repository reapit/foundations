import React from 'react'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import Toast from '../components/ui/toast'
import ToastMessage from '../components/ui/toast-message'
import { PortalProvider } from '@reapit/elements'

const App = () => (
  <Provider store={store.reduxStore}>
    <PortalProvider>
      <Router />
    </PortalProvider>
    <Toast />
    <ToastMessage />
  </Provider>
)

export default App
