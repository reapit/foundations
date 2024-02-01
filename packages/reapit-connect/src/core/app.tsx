import '@reapit/elements/dist/index.css'
import * as React from 'react'
import Router from './router'
import { useReapitConnect, LoginIdentity } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'
import { Loader, MainContainer, PageContainer } from '@reapit/elements'

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
