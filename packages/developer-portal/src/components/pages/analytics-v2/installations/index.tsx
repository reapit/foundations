import React, { FC } from 'react'
import { Loader, Subtitle, Title } from '@reapit/elements'
import { useAnalyticsState } from '../state/use-analytics-state'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { ChartWrapper } from '../__styles__'
import dayjs from 'dayjs'
import { InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import { useReapitConnect } from '@reapit/connect-session'
import { InstallationsPerDayChart } from './installations-per-day-chart'
import { InstallationsByAppChart } from './installations-by-app-chart'

export const AnalyticsInstallations: FC = () => {
  const { analyticsFilterState } = useAnalyticsState()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { dateFrom, dateTo, clientId, appId, dateRange } = analyticsFilterState
  const developerId = connectSession?.loginIdentity.developerId

  const appsQuery = appId ? { appId } : {}

  const customerQuery = clientId ? { clientId } : {}

  const dateFromQuery = !dateRange ? dateFrom : dayjs().subtract(1, dateRange).format('YYYY-MM-DD')
  const dateToQuery = !dateRange ? dateTo : dayjs().format('YYYY-MM-DD')

  const [installations, installationsLoading] = useReapitGet<InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getInstallations],
    queryParams: {
      isInstalled: true,
      pageSize: 999,
      installedDateFrom: dateFromQuery,
      installedDateTo: dateToQuery,
      ...appsQuery,
      ...customerQuery,
    },
    fetchWhenTrue: [dateFromQuery, dateToQuery, developerId],
  })

  return (
    <>
      <Title>Installations</Title>
      <ChartWrapper>
        <Subtitle>Installations Per Day</Subtitle>
        {installationsLoading && <Loader />}
        {installations && <InstallationsPerDayChart installations={installations} />}
      </ChartWrapper>
      <ChartWrapper>
        <Subtitle>Installations Per App</Subtitle>
        {installationsLoading && <Loader />}
        {installations && <InstallationsByAppChart installations={installations} />}
      </ChartWrapper>
    </>
  )
}

export default AnalyticsInstallations
