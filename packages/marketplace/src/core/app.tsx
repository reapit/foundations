import React from 'react'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import Toast from '../components/ui/toast'
import ToastMessage from '../components/ui/toast-message'

const App = () => {
  return (
    <Provider store={store.reduxStore}>
      <Router />
      <Toast />
      <ToastMessage />
    </Provider>
  )
}

export default App
