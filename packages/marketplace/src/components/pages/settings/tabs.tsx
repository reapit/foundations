import * as React from 'react'
import Routes from '@/constants/routes'
import { Tabs as ElementsTabs, TabConfig } from '@reapit/elements'
import { useHistory, useRouteMatch } from 'react-router-dom'

export type TabConfigsProps = {
  currentUrl: string
  history: any
}

export const tabConfigs = ({ currentUrl, history }: TabConfigsProps): TabConfig[] => {
  return [
    {
      tabIdentifier: Routes.DEVELOPER_SETTINGS,
      displayText: 'Profile',
      onTabClick: () => {
        history.push(Routes.DEVELOPER_SETTINGS)
      },
      active: currentUrl === Routes.DEVELOPER_SETTINGS,
    },
    {
      tabIdentifier: Routes.DEVELOPER_SETTINGS_ORGANISATION_TAB,
      displayText: 'Organisation',
      onTabClick: () => {
        history.push(Routes.DEVELOPER_SETTINGS_ORGANISATION_TAB)
      },
      active: currentUrl === Routes.DEVELOPER_SETTINGS_ORGANISATION_TAB,
    },
    {
      tabIdentifier: Routes.DEVELOPER_SETTINGS_BILLING_TAB,
      displayText: 'Billing',
      onTabClick: () => {
        history.push(Routes.DEVELOPER_SETTINGS_BILLING_TAB)
      },
      active: currentUrl === Routes.DEVELOPER_SETTINGS_BILLING_TAB,
    },
  ]
}

export const Tabs = () => {
  const history = useHistory()
  const match = useRouteMatch()

  return <ElementsTabs tabConfigs={tabConfigs({ currentUrl: match.url, history })} />
}
