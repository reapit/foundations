import '../styles/index.scss'
import React from 'react'
import { Provider } from 'react-redux'
import Router from './router'
import store from './store'

const App = () => {
  return (
    <Provider store={store.reduxStore}>
      <Router />
    </Provider>
  )
}

export default App
