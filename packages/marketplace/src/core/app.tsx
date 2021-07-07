import React from 'react'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import './__styles__'
import { MediaStateProvider, NavStateProvider } from '@reapit/elements'

const App = () => {
  return (
    <Provider store={store.reduxStore}>
      <NavStateProvider>
        <MediaStateProvider>
          <Router />
        </MediaStateProvider>
      </NavStateProvider>
    </Provider>
  )
}

export default App
