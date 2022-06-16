import React, { FC, useEffect } from 'react'
import { PipelinePage } from './pipeline-page'
import ErrorBoundary from '../../../core/error-boundary'
import { Route, Switch, useParams } from 'react-router'
import Routes from '../../../constants/routes'
import { AppUriParams, useAppState } from '../state/use-app-state'
import { handleSetAppId } from '../utils/handle-set-app-id'
import { PipelineNew } from './pipeline-new'

export const AppPipeline: FC = () => {
  const { setAppId } = useAppState()

  const { appId } = useParams<AppUriParams>()

  useEffect(handleSetAppId(appId, setAppId), [appId])

  return (
    <ErrorBoundary>
      <Switch>
        <Route path={Routes.APP_PIPELINE_NEW} exact component={PipelineNew} />
        <Route path={Routes.APP_PIPELINE} component={PipelinePage} />
      </Switch>
    </ErrorBoundary>
  )
}

export default AppPipeline
