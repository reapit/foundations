import { PusherProvider } from '@harelpls/use-pusher'
import { useReapitConnect } from '@reapit/connect-session'
import React, { FC } from 'react'
import { URLS } from '../../constants/api'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { AppsPage } from './page'
import { AppProvider } from './state/use-app-state'

export const Apps: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  if (!connectSession) return null

  return (
    <PusherProvider
      cluster="eu"
      clientKey={process.env.PUSHER_KEY}
      authEndpoint={`${URLS.DEPLOYMENT_SERVICE_HOST}pusher/auth`}
      auth={{
        headers: {
          Authorization: connectSession.idToken,
        },
      }}
    >
      <AppProvider>
        <AppsPage />
      </AppProvider>
    </PusherProvider>
  )
}

export default Apps
