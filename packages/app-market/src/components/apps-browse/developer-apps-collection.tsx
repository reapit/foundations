import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { Loader } from '@reapit/elements'
import { AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'

export const DeveloperAppsCollection: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity.developerId

  const [apps, appsLoading] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', developerId, pageSize: 100, pageNumber: 1 },
    fetchWhenTrue: [developerId],
  })

  console.log('Developer Apps: ', apps)

  if (appsLoading) return <Loader />

  return null
}
