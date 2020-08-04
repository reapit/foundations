import * as React from 'react'
import { css } from 'linaria'
import { PortalProvider } from '@reapit/elements'
import { ApolloProvider } from '@apollo/react-hooks'
import { useAuth } from '@/hooks/use-auth'
import { AuthContext } from '@/context'
import getClient from '@/graphql/client'
import Router from './router'
import UploadProvider from '@/components/providers/upload-provider'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'

export const globals = css`
  :global() {
    body {
      background-color: unset;
    }
    td.hidden-cell {
      display: none;
    }
  }
`

const App = () => {
  /*
   * TODOME(App)
   * access token get from useReapitConnect
   * temp return null
   * just try to print token
   * amc comment bakc
   */

  const { loginSession, refreshParams, getLoginSession, ...rest } = useAuth()
  // if (!loginSession && refreshParams) {
  //   getLoginSession(refreshParams)
  // }
  const accessToken = loginSession?.accessToken || ''
  window.reapit.config.accessToken = accessToken
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  console.log({ connectSession })

  /*
   * TODOME(App)
   * remove context
   */

  return (
    <AuthContext.Provider value={{ loginSession, refreshParams, getLoginSession, ...rest }}>
      <ApolloProvider client={getClient(accessToken, window.reapit.config.graphqlUri)}>
        <PortalProvider>
          <UploadProvider>
            <Router />
          </UploadProvider>
        </PortalProvider>
      </ApolloProvider>
    </AuthContext.Provider>
  )
}

export default App
