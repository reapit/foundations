import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { Loader } from '@reapit/elements'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { useAppsBrowseState } from './use-apps-browse-state'

export const FilteredAppsCollection: FC = () => {
  const { appsBrowseFilterState } = useAppsBrowseState()
  const queryParams = appsBrowseFilterState ? appsBrowseFilterState : {}

  const [apps, appsLoading] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams,
    fetchWhenTrue: [appsBrowseFilterState],
  })

  console.log('Filtered Apps: ', apps)

  if (appsLoading) return <Loader />

  return null
}
