import * as React from 'react'
import Router from './router'
import { css } from 'linaria'

const globalStyles = css`
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
  return (
    <div className={globalStyles}>
      <Router />
    </div>
  )
}

export default App
