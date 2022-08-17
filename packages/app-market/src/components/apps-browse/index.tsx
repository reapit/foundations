import React, { FC, useEffect } from 'react'
import { onPageLoadHandler } from '../../core/analytics'
import { TrackingEvent } from '../../core/analytics-events'
import { AppsBrowse } from './apps-browse'

export const AppsBrowsePage: FC = () => {
  useEffect(onPageLoadHandler(TrackingEvent.LoadBrowse, true), [])

  return <AppsBrowse />
}

export default AppsBrowsePage
