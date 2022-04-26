import React, { FC } from 'react'
import { Button, ButtonGroup, FlexContainer, Loader, Subtitle, Title, useMediaQuery, useModal } from '@reapit/elements'
import { HitsPerDayChart } from './hits-per-day-chart'
import { useAnalyticsState } from '../state/use-analytics-state'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet, listToBatchQuery } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { AppSummaryModel, TrafficEventsModel } from '@reapit/foundations-ts-definitions'
import { ChartWrapper } from '../__styles__'
import { HitsByResourceChart } from './hits-by-resource-chart'
import { Controls } from '../page/controls'

export const AnalyticsCalls: FC = () => {
  const { analyticsFilterState, analyticsDataState } = useAnalyticsState()
  const { Modal, openModal, closeModal } = useModal()
  const { isMobile } = useMediaQuery()
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

  return (
    <>
      <FlexContainer isFlexJustifyBetween>
        <Title>API Calls</Title>
        {isMobile && (
          <ButtonGroup alignment="right">
            <Button intent="low" onClick={openModal}>
              Controls
            </Button>
          </ButtonGroup>
        )}
      </FlexContainer>
      {isMobile && (
        <Modal title="Controls">
          <Controls />
          <ButtonGroup alignment="center">
            <Button fixedWidth intent="secondary" onClick={closeModal}>
              Close
            </Button>
          </ButtonGroup>
        </Modal>
      )}
      <FlexContainer isFlexWrap>
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
      </FlexContainer>
    </>
  )
}

export default AnalyticsCalls
