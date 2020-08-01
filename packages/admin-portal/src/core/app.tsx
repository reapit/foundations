import React from 'react'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import Toast from '../components/ui/toast'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

const App = () => {
  const session = useReapitConnect(reapitConnectBrowserSession)
  if (!session.connectSession) {
    return null
  }

  return (
    <Provider store={store.reduxStore}>
      <Router />
      <Toast />
    </Provider>
  )
}

export default App
