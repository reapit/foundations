import * as React from 'react'
import Router from './router'
import { css } from 'linaria'
import { useReapitConnect, LoginIdentity } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'
import { FlexContainerBasic, FlexContainerResponsive, Loader } from '@reapit/elements'

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
    return (
      <FlexContainerBasic flexColumn>
        <FlexContainerResponsive flexColumn isScrollable hasPadding>
          <Loader />
        </FlexContainerResponsive>
      </FlexContainerBasic>
    )
  }

  if (isUserWithDevIdOnly(session.connectSession?.loginIdentity)) {
    window.location.href = window.reapit.config.developerPortalUrl
    return null
  }

  return <Router />
}

export default App
