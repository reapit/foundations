import React, { FC, useEffect } from 'react'
import { onPageLoadHandler, TrackingEvent } from '../../core/analytics'
import { AppsInstalled } from './apps-installed'

export const AppsInstalledPage: FC = () => {
  useEffect(onPageLoadHandler(TrackingEvent.LoadInstalled, true), [])

  return <AppsInstalled />
}

export default AppsInstalledPage
