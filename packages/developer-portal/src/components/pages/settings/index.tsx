import React, { FC } from 'react'
import { SettingsPage } from './page'
import { SettingsProvider } from './state/use-settings-state'

export const Settings: FC = () => (
  <SettingsProvider>
    <SettingsPage />
  </SettingsProvider>
)

export default Settings
