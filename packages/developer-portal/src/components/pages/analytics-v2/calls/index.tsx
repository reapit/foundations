import React, { FC } from 'react'
import { Loader, Subtitle, Title } from '@reapit/elements'
import { HitsPerDayChart } from './hits-per-day-chart'
import { useAnalyticsState } from '../state/use-analytics-state'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet, listToBatchQuery } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { AppSummaryModel, TrafficEventsModel } from '@reapit/foundations-ts-definitions'
import { ChartWrapper } from '../__styles__'
import dayjs from 'dayjs'
import { HitsByResourceChart } from './hits-by-resource-chart'

export const AnalyticsCalls: FC = () => {
  const { analyticsFilterState, analyticsDataState } = useAnalyticsState()
  const { dateFrom, dateTo, clientId, appId, dateRange } = analyticsFilterState
  const { apps } = analyticsDataState

  const appsQuery = appId
    ? appId
    : apps?.data
    ? listToBatchQuery<AppSummaryModel>(apps.data, 'id', 'applicationId')
    : null

  const customerQuery = clientId ? { customerId: clientId } : {}

  const dateFromQuery = !dateRange ? dateFrom : dayjs().subtract(1, dateRange).format('YYYY-MM-DD')
  const dateToQuery = !dateRange ? dateTo : dayjs().format('YYYY-MM-DD')

  const [trafficEvents, trafficEventsLoading] = useReapitGet<TrafficEventsModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getTrafficStats],
    queryParams: { dateFrom: dateFromQuery, dateTo: dateToQuery, applicationId: appsQuery, ...customerQuery },
    fetchWhenTrue: [dateFromQuery, dateToQuery, appsQuery],
  })

  return (
    <>
      <Title>API Calls</Title>
      <ChartWrapper>
        <Subtitle>Hits Per Day</Subtitle>
        {trafficEventsLoading && <Loader />}
        {trafficEvents && <HitsPerDayChart trafficEvents={trafficEvents} />}
      </ChartWrapper>
      <ChartWrapper>
        <Subtitle>Hits By Resource</Subtitle>
        {trafficEventsLoading && <Loader />}
        {trafficEvents && <HitsByResourceChart trafficEvents={trafficEvents} />}
      </ChartWrapper>
    </>
  )
}

export default AnalyticsCalls
