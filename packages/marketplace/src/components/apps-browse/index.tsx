import React, { FC, useEffect } from 'react'
import { trackEventHandler } from '../../core/analytics'
import { TrackingEvent } from '../../core/analytics-events'
import { AppsBrowse } from './apps-browse'

export const AppsBrowsePage: FC = () => {
  useEffect(trackEventHandler(TrackingEvent.LoadBrowse, true), [])

  return <AppsBrowse />
}

export default AppsBrowsePage
