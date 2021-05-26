import React from 'react'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import Toast from '../components/ui/toast'
import ToastMessage from '../components/ui/toast-message'
import { css } from 'linaria'

export const globals = css`
  :global() {
    body {
      background: #262f69;
    }

    #root {
      height: 100%;
      background: #f2f2f2;
    }
  }
`

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
