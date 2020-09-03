import React from 'react'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import { css } from 'linaria'

export const globals = css`
  :global() {
    @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    #root {
      height: 100%;
    }
  }
`

const App = () => {
  return (
    <Provider store={store.reduxStore}>
      <Router />
    </Provider>
  )
}

export default App
