import React from 'react'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import './__styles__'
import { MediaStateProvider, NavStateProvider, SnackProvider } from '@reapit/elements'

const App = () => {
  return (
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
}

export default App
