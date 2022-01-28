import * as React from 'react'
import Routes from '@/constants/routes'
import { Tabs as ElementsTabs, TabConfig } from '@reapit/elements-legacy'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectSubscriptions, selectSubscriptionsLoading } from '../../../selector/developer-subscriptions'
import { getDeveloperIdFromConnectSession } from '../../../utils/session'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useEffect } from 'react'
import { developerFetchSubscriptions } from '../../../actions/developer-subscriptions'
import { Dispatch } from 'redux'
import { SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'

export type TabConfigsProps = {
  currentUrl: string
  history: any
  role?: string
  subscriptions?: SubscriptionModelPagedResult
}

export const handleFetchSubscriptions = (dispatch: Dispatch, developerId: string) => () => {
  developerId && dispatch(developerFetchSubscriptions({ developerId }))
}

export const tabConfigs = ({ currentUrl, history, role, subscriptions }: TabConfigsProps): TabConfig[] => {
  const tabs = [
    {
      tabIdentifier: Routes.SETTINGS_PROFILE_TAB,
      displayText: 'Profile',
      onTabClick: () => {
        history.push(Routes.SETTINGS_PROFILE_TAB)
      },
      active: currentUrl === Routes.SETTINGS_PROFILE_TAB,
    },
  ]

  if (role === 'admin') {
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

  if (role === 'admin' && subscriptions?.data?.length) {
    tabs.push({
      tabIdentifier: Routes.SETTINGS_BILLING_TAB,
      displayText: 'Subscriptions',
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
  const dispatch = useDispatch()
  const loading = useSelector(selectSubscriptionsLoading)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = getDeveloperIdFromConnectSession(connectSession)
  const subscriptions = useSelector(selectSubscriptions)

  useEffect(handleFetchSubscriptions(dispatch, developerId), [dispatch, developerId])

  return role === 'admin' && loading ? null : (
    <ElementsTabs tabConfigs={tabConfigs({ currentUrl: match.url, history, role, subscriptions })} />
  )
}
