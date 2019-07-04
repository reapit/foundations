import '../styles/index.scss'
import * as React from 'react'
import { render } from 'react-dom'
import Router from './router'
import { Provider } from 'react-redux'
import Store from './store'
import Toast from '../components/ui/toast'

const rootElement = document.querySelector('#root') as Element

const App = () => (
  <Provider store={Store.reduxStore}>
    <Router />
    <Toast />
  </Provider>
)

if (rootElement) {
  render(<App />, rootElement)
}

export default App
