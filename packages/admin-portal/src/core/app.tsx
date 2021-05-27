import React from 'react'
import Router from './router'
import { Provider } from 'react-redux'
import store from './store'
import { css } from 'linaria'

export const globals = css`
  :global() {
    @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    body {
      background: #262f69;
    }

    #root {
      height: 100%;
      background: #f2f2f2;
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
