import * as React from 'react'
import Routes from '@/constants/routes'
import { Tabs as ElementsTabs, TabConfig } from '@reapit/elements'
import { useHistory, useRouteMatch } from 'react-router-dom'

export type TabConfigsProps = {
  currentUrl: string
  history: any
  isProd: boolean
  role?: string
}

export const tabConfigs = ({ currentUrl, history, role, isProd }: TabConfigsProps): TabConfig[] => {
  const tabs = [
    {
      tabIdentifier: Routes.SETTINGS,
      displayText: 'Profile',
      onTabClick: () => {
        history.push(Routes.SETTINGS)
      },
      active: currentUrl === Routes.SETTINGS,
    },
  ]

  if (role === 'admin' && !isProd) {
    // Use splice to make sure ORGANISATION_TAB is second tab
    tabs.push({
      tabIdentifier: Routes.SETTINGS_ORGANISATION_TAB,
      displayText: 'Organisation',
      onTabClick: () => {
        history.push(Routes.SETTINGS_ORGANISATION_TAB)
      },
      active: currentUrl === Routes.SETTINGS_ORGANISATION_TAB,
    })
  }
  if (role === 'admin') {
    tabs.push({
      tabIdentifier: Routes.SETTINGS_BILLING_TAB,
      displayText: 'Billing',
      onTabClick: () => {
        history.push(Routes.SETTINGS_BILLING_TAB)
      },
      active: currentUrl === Routes.SETTINGS_BILLING_TAB,
    })
  }
  return tabs
}

export type TabsProps = {
  role?: string
}

export const Tabs: React.FC<TabsProps> = ({ role }) => {
  const history = useHistory()
  const match = useRouteMatch()
  const isProd = window.reapit.config.appEnv === 'production'
  return <ElementsTabs tabConfigs={tabConfigs({ currentUrl: match.url, history, isProd, role })} />
}
