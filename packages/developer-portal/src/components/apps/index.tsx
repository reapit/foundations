import React, { FC } from 'react'
import { AppsPage } from './page'
import { AppProvider } from './state/use-app-state'

export const Apps: FC = () => (
  <AppProvider>
    <AppsPage />
  </AppProvider>
)

export default Apps
