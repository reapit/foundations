import * as React from 'react'
import { render } from 'react-dom'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'

import CurrentLocButton from '../components/container/current-loc-button'

const rootElement = document.querySelector('#root') as Element

const App = () => (
  <Provider store={store.reduxStore}>
    <Router />
  </Provider>
)

if (rootElement) {
  render(<App />, rootElement)
}

export default App
