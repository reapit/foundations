import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { PipelinePage } from './pipeline-page'
import ErrorBoundary from '../../../core/error-boundary'
import { Route, Routes, useParams } from 'react-router'
import RoutePaths from '../../../constants/routes'
import { useAppState } from '../state/use-app-state'
import { handleSetAppId } from '../utils/handle-set-app-id'
import { PipelineNew } from './pipeline-new'

export const handleBetaBannerTimeout = (setBetaBannerVisible: Dispatch<SetStateAction<boolean>>) => () => {
  const timeout = setTimeout(() => {
    setBetaBannerVisible(false)
  }, 10000)

  return () => clearTimeout(timeout)
}

export const AppPipeline: FC = () => {
  const { setAppId } = useAppState()

  const { appId } = useParams<'appId'>()

  useEffect(handleSetAppId(setAppId, appId), [appId])

  return (
    <ErrorBoundary>
      <Routes>
        <Route path={RoutePaths.APP_PIPELINE_NEW.split('pipeline/')[1]} element={<PipelineNew />} />
        <Route path="*" element={<PipelinePage />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default AppPipeline
