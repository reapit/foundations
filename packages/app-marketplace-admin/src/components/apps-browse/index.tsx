import React, { FC } from 'react'
import { AppsBrowse } from './apps-browse'
import { AppsBrowseProvider } from './use-apps-browse-state'

export const AppsBrowsePage: FC = () => (
  <AppsBrowseProvider>
    <AppsBrowse />
  </AppsBrowseProvider>
)

export default AppsBrowsePage
