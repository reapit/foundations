import * as React from 'react'
import { css } from 'linaria'
import { PortalProvider } from '@reapit/elements'
import { ApolloProvider } from '@apollo/react-hooks'
import getClient from '@/graphql/client'
import Router from './router'
import UploadProvider from '@/components/providers/upload-provider'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'

export const globals = css`
  :global() {
    td.hidden-cell {
      display: none;
    }
  }
`

const App = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  if (!connectSession) return null

  return (
    <ApolloProvider client={getClient(connectSession?.accessToken || '', window.reapit.config.graphqlUri)}>
      <PortalProvider>
        <UploadProvider>
          <Router />
        </UploadProvider>
      </PortalProvider>
    </ApolloProvider>
  )
}

export default App
