import React from 'react'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import Toast from '../components/ui/toast'
import ToastMessage from '../components/ui/toast-message'
import { css } from 'linaria'
import { MediaStateProvider, NavStateProvider } from '@reapit/elements'

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
      <NavStateProvider>
        <MediaStateProvider>
          <Router />
          <Toast />
          <ToastMessage />
        </MediaStateProvider>
      </NavStateProvider>
    </Provider>
  )
}

export default App
