import * as React from 'react'
import Routes from '@/constants/routes'
import { useSelector } from 'react-redux'
import { selectIsAdmin } from '@/selector/auth'
import { Tabs as ElementsTabs, TabConfig } from '@reapit/elements'
import { useHistory, useRouteMatch } from 'react-router-dom'

export type TabConfigsProps = {
  currentUrl: string
  history: any
  isAdmin: boolean
  isProd: boolean
}

export const tabConfigs = ({ currentUrl, history, isAdmin, isProd }: TabConfigsProps): TabConfig[] => {
  const tabs = [
    {
      tabIdentifier: Routes.SETTINGS,
      displayText: 'Profile',
      onTabClick: () => {
        history.push(Routes.SETTINGS)
      },
      active: currentUrl === Routes.SETTINGS,
    },
    {
      tabIdentifier: Routes.SETTINGS_BILLING_TAB,
      displayText: 'Billing',
      onTabClick: () => {
        history.push(Routes.SETTINGS_BILLING_TAB)
      },
      active: currentUrl === Routes.SETTINGS_BILLING_TAB,
    },
  ]

  if (isAdmin && !isProd) {
    // Use splice to make sure ORGANISATION_TAB is second tab
    tabs.splice(1, 0, {
      tabIdentifier: Routes.SETTINGS_ORGANISATION_TAB,
      displayText: 'Organisation',
      onTabClick: () => {
        history.push(Routes.SETTINGS_ORGANISATION_TAB)
      },
      active: currentUrl === Routes.SETTINGS_ORGANISATION_TAB,
    })
  }

  return tabs
}

export const Tabs = () => {
  const history = useHistory()
  const match = useRouteMatch()
  const isAdmin = useSelector(selectIsAdmin)
  const isProd = window.reapit.config.appEnv === 'production'

  return <ElementsTabs tabConfigs={tabConfigs({ currentUrl: match.url, history, isAdmin, isProd })} />
}
