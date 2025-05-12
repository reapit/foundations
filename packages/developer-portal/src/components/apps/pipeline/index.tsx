import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { PipelinePage } from './pipeline-page'
import ErrorBoundary from '../../../core/error-boundary'
import { Route, Routes, useParams } from 'react-router'
import RoutePaths from '../../../constants/routes'
import { useAppState } from '../state/use-app-state'
import { handleSetAppId } from '../utils/handle-set-app-id'
import { PipelineNew } from './pipeline-new'
import { PersistentNotification } from '@reapit/elements'
import { ExternalPages } from '../../../utils/navigation'

export const handleBetaBannerTimeout = (setBetaBannerVisible: Dispatch<SetStateAction<boolean>>) => () => {
  const timeout = setTimeout(() => {
    setBetaBannerVisible(false)
  }, 10000)

  return () => clearTimeout(timeout)
}

export const handleSandboxClick =
  (setBetaBannerVisible: Dispatch<SetStateAction<boolean>>, sandboxVisibile: boolean) => () => {
    setBetaBannerVisible(!sandboxVisibile)
  }

export const AppPipeline: FC = () => {
  const { setAppId } = useAppState()
  const [betaBannerVisible, setBetaBannerVisible] = useState(true)

  const { appId } = useParams<'appId'>()

  useEffect(handleSetAppId(setAppId, appId), [appId])
  useEffect(handleBetaBannerTimeout(setBetaBannerVisible), [])

  return (
    <ErrorBoundary>
      <PersistentNotification
        onClick={handleSandboxClick(setBetaBannerVisible, betaBannerVisible)}
        isExpanded={betaBannerVisible}
        intent="primary"
      >
        Pipelines are in public beta and under active development. Please give us feeback and report bugs via{' '}
        <a href={ExternalPages.iaasBugs} target="_blank" rel="noopener noreferrer">
          Github
        </a>{' '}
        or{' '}
        <a
          href="mailto:appsupport@reapit.com?subject=IAAS%20Beta"
          target="_blank"
          rel="noopener noreferrer"
        >
          email.
        </a>
      </PersistentNotification>
      <Routes>
        <Route path={RoutePaths.APP_PIPELINE_NEW.split('pipeline/')[1]} element={<PipelineNew />} />
        <Route path="*" element={<PipelinePage />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default AppPipeline
