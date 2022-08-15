import React, { FC, useEffect } from 'react'
import { onPageLoadHandler, TrackingEvent } from '../../core/analytics'
import { AppsBrowse } from './apps-browse'

export const AppsBrowsePage: FC = () => {
  useEffect(onPageLoadHandler(TrackingEvent.LoadBrowse, true), [])

  return <AppsBrowse />
}

export default AppsBrowsePage
