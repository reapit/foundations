import React, { FC, useEffect } from 'react'
import { trackEventHandler } from '../../core/analytics'
import { TrackingEvent } from '../../core/analytics-events'
import { AppsInstalled } from './apps-installed'

export const AppsInstalledPage: FC = () => {
  useEffect(trackEventHandler(TrackingEvent.LoadInstalled, true), [])

  return <AppsInstalled />
}

export default AppsInstalledPage
