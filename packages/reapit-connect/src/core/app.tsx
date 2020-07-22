import * as React from 'react'
import Router from './router'
import { css } from 'linaria'

export const globals = css`
  :global() {
    @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    #root {
      height: 100%;
      background-color: #fff;
    }
  }
`

export const App = () => {
  return <Router />
}

export default App
