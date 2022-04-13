import React, { FC } from 'react'
import { AnalyticsPage } from './page'
import { AnalyticsProvider } from './state/use-analytics-state'

export const AnalyticsV2: FC = () => (
  <AnalyticsProvider>
    <AnalyticsPage />
  </AnalyticsProvider>
)

export default AnalyticsV2
