import React from 'react'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import Toast from '../components/ui/toast'
import ToastMessage from '../components/ui/toast-message'
import { css } from '@linaria/core'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'

export const globals = css`
  :global() {
    html {
      overflow: hidden;
    }

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
      <SnackProvider>
        <NavStateProvider>
          <MediaStateProvider>
            <Router />
            <Toast />
            <ToastMessage />
          </MediaStateProvider>
        </NavStateProvider>
      </SnackProvider>
    </Provider>
  )
}

export default App
