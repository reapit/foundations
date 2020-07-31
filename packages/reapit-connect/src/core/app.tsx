import * as React from 'react'
import Router from './router'
import { css } from 'linaria'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'

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
  const session = useReapitConnect(reapitConnectBrowserSession)
  if (!session.connectSession) {
    return null
  }

  return <Router />
}

export default App
