import React, { FC } from 'react'
import { Loader, Subtitle, Title } from '@reapit/elements'
import { HitsPerDayChart } from './hits-per-day-chart'
import { useAnalyticsState } from '../state/use-analytics-state'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet, listToBatchQuery } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { AppSummaryModel, TrafficEventsModel } from '@reapit/foundations-ts-definitions'

export const AnalyticsCalls: FC = () => {
  const { analyticsFilterState, analyticsDataState } = useAnalyticsState()
  const { dateFrom, dateTo, clientId, appId } = analyticsFilterState
  const { apps } = analyticsDataState

  const appsQuery = appId
    ? appId
    : apps?.data
    ? listToBatchQuery<AppSummaryModel>(apps.data, 'id', 'applicationId')
    : null

  const customerQuery = clientId ? { customerId: clientId } : {}

  const [trafficEvents, trafficEventsLoading] = useReapitGet<TrafficEventsModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getTrafficStats],
    queryParams: { dateFrom, dateTo, applicationId: appsQuery, ...customerQuery },
    fetchWhenTrue: [dateFrom, dateTo, appsQuery],
  })

  console.log(trafficEvents)

  return (
    <>
      <Title>API Calls</Title>
      <Subtitle>Hits Per Day</Subtitle>
      {trafficEventsLoading && <Loader />}
      {trafficEvents && <HitsPerDayChart trafficEvents={trafficEvents} />}
      <Subtitle>Hits By Resource</Subtitle>
    </>
  )
}

export default AnalyticsCalls
