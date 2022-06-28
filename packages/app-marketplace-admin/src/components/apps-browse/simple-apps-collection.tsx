import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { Loader } from '@reapit/elements'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { AppsBrowseConfigItem } from './use-apps-browse-state'

interface SimpleAppsCollectionProps {
  configItem: AppsBrowseConfigItem
}

export const SimpleAppsCollection: FC<SimpleAppsCollectionProps> = ({ configItem }) => {
  const { filters, content } = configItem
  const queryParams = filters ? filters : {}

  const [apps, appsLoading] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams,
    fetchWhenTrue: [filters],
  })

  console.log('Simple Apps: ', apps, content)

  if (appsLoading) return <Loader />

  return null
}
