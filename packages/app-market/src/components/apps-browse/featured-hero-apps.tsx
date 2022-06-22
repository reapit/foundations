import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { objectToQuery, useReapitGet } from '@reapit/utils-react'
import { Loader } from '@reapit/elements'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { AppsBrowseConfigItem, AppsBrowseConfigItemFilters } from './use-apps-browse-state'

interface FeaturedHeroAppsCollectionProps {
  configItem: AppsBrowseConfigItem
}

export const FeaturedHeroAppsCollection: FC<FeaturedHeroAppsCollectionProps> = ({ configItem }) => {
  const { filters, content } = configItem
  const queryParams = filters ? objectToQuery<AppsBrowseConfigItemFilters>(filters) : {}

  const [apps, appsLoading] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams,
    fetchWhenTrue: [filters],
  })

  console.log('Featured hero Apps: ', apps, content)

  if (appsLoading) return <Loader />

  return null
}
