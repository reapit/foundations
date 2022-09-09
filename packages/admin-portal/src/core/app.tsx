import React from 'react'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import { css } from '@linaria/core'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'

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

const App = () => (
  <Provider store={store.reduxStore}>
    <SnackProvider>
      <NavStateProvider>
        <MediaStateProvider>
          <Router />
        </MediaStateProvider>
      </NavStateProvider>
    </SnackProvider>
  </Provider>
)

export default App
