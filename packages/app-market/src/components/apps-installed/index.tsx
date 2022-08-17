import React, { FC, useEffect } from 'react'
import { onPageLoadHandler } from '../../core/analytics'
import { TrackingEvent } from '../../core/analytics-events'
import { AppsInstalled } from './apps-installed'

export const AppsInstalledPage: FC = () => {
  useEffect(onPageLoadHandler(TrackingEvent.LoadInstalled, true), [])

  return <AppsInstalled />
}

export default AppsInstalledPage
