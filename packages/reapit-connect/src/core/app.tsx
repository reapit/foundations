import * as React from 'react'
import Router from './router'
import { css } from 'linaria'
import { useReapitConnect, LoginIdentity } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'
import { DEVELOPER_PORTAL_APPS } from '../constants/routes'

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

export const isUserWithDevIdOnly = (loginIdentity: LoginIdentity) => {
  const developerOnlyClientId = loginIdentity.clientId === 'SBOX'
  return loginIdentity.developerId && (!loginIdentity.clientId || developerOnlyClientId) && !loginIdentity.adminId
}

export const App = () => {
  const session = useReapitConnect(reapitConnectBrowserSession)

  if (!session.connectSession?.loginIdentity) {
    return null
  }

  if (isUserWithDevIdOnly(session.connectSession?.loginIdentity)) {
    window.location.href = DEVELOPER_PORTAL_APPS
  }

  return <Router />
}

export default App
