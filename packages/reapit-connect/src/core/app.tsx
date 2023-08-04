import * as React from 'react'
import Router from './router'
import { css } from '@linaria/core'
import { useReapitConnect, LoginIdentity } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'
import { Loader, MainContainer, PageContainer } from '@reapit/elements'

export const globals = css`
  :global() {
    @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap');
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

    #root {
      height: 100%;
      background-color: #fff;
    }

    * {
      box-sizing: border-box !important;
      line-height: 20px;
    }

    html {
      font-size: 16px !important;
      font-family: 'Roboto', Helvetica, Arial, sans-serif;

      &.is-desktop {
        font-size: 14px !important;
      }
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
    return (
      <MainContainer>
        <PageContainer>
          <Loader />
        </PageContainer>
      </MainContainer>
    )
  }

  if (isUserWithDevIdOnly(session.connectSession?.loginIdentity)) {
    window.location.href = process.env.developerPortalUrl
    return null
  }

  return <Router />
}

export default App
