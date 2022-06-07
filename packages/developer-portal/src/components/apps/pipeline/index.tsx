import React, { FC, useEffect } from 'react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { PusherProvider } from '@harelpls/use-pusher'
import { URLS } from '../../../constants/api'
import { PipelinePage } from './pipeline-page'
import ErrorBoundary from '../../../core/error-boundary'
import { Route, Switch, useParams } from 'react-router'
import Routes from '../../../constants/routes'
import { AppUriParams, useAppState } from '../state/use-app-state'
import { handleSetAppId } from '../utils/handle-set-app-id'
import { PipelineNew } from './pipeline-new'

export const AppPipeline: FC = () => {
  const { setAppId } = useAppState()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { appId } = useParams<AppUriParams>()

  useEffect(handleSetAppId(appId, setAppId), [appId])

  if (!connectSession) return null

  return (
    <PusherProvider
      cluster="eu"
      clientKey={window.reapit.config.PUSHER_KEY}
      authEndpoint={`${URLS.DEPLOYMENT_SERVICE_HOST}pusher/auth`}
      auth={{
        headers: {
          Authorization: connectSession.idToken,
        },
      }}
    >
      <ErrorBoundary>
        <Switch>
          <Route path={Routes.APP_PIPELINE_NEW} exact component={PipelineNew} />
          <Route path={Routes.APP_PIPELINE} component={PipelinePage} />
        </Switch>
      </ErrorBoundary>
    </PusherProvider>
  )
}

export default AppPipeline
