import React from 'react'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import './__styles__'

const App = () => {
  return (
    <Provider store={store.reduxStore}>
      <Router />
    </Provider>
  )
}

export default App
