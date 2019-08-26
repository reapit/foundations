import React from 'react'
import ReactDOM from 'react-dom'
import { hot } from 'react-hot-loader/root'
import { Provider } from 'react-redux'
import App from '@pages/App'
import store from '@/store'
import * as serviceWorker from './serviceWorker'

const renderApp = (Component: React.ComponentType): void => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root') as HTMLElement,
  )
}

const run = async () => {
  // This func will be use for init something before render app
  const isDevelopmentEnv = process.env.NODE_ENV === 'development'
  const newApp = isDevelopmentEnv ? hot(App) : App
  await renderApp(newApp)
}

run()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
