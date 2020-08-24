import React from 'react'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'

const App = () => {
  return (
    <Provider store={store.reduxStore}>
      <Router />
    </Provider>
  )
}

export default App
