import React, { FC } from 'react'
import { Button, ButtonGroup, FlexContainer, Loader, Subtitle, Title, useMediaQuery, useModal } from '@reapit/elements'
import { useAnalyticsState } from '../state/use-analytics-state'
import { GetActionNames, getActions } from '@reapit/use-reapit-data'
import { useReapitGet } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { ChartWrapper } from '../__styles__'
import { InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import { useReapitConnect } from '@reapit/connect-session'
import { InstallationsPerDayChart } from './installations-per-day-chart'
import { InstallationsByAppChart } from './installations-by-app-chart'
import { Controls } from '../page/controls'

export const AnalyticsInstallations: FC = () => {
  const { analyticsFilterState } = useAnalyticsState()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { dateFrom, dateTo, clientId, appId } = analyticsFilterState
  const developerId = connectSession?.loginIdentity.developerId
  const { Modal, openModal, closeModal } = useModal()
  const { isMobile } = useMediaQuery()

  const appsQuery = appId ? { appId } : {}

  const customerQuery = clientId ? { clientId } : {}

  const [installations, installationsLoading] = useReapitGet<InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getInstallations],
    queryParams: {
      isInstalled: true,
      pageSize: 999,
      installedDateFrom: dateFrom,
      installedDateTo: dateTo,
      ...appsQuery,
      ...customerQuery,
    },
    fetchWhenTrue: [dateFrom, dateTo, developerId],
  })

  return (
    <>
      <FlexContainer isFlexJustifyBetween>
        <Title>Installations</Title>
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
          <Subtitle>Installations Per Day</Subtitle>
          {installationsLoading && <Loader />}
          {installations && <InstallationsPerDayChart installations={installations} />}
        </ChartWrapper>
        <ChartWrapper>
          <Subtitle>Installations Per App</Subtitle>
          {installationsLoading && <Loader />}
          {installations && <InstallationsByAppChart installations={installations} />}
        </ChartWrapper>
      </FlexContainer>
    </>
  )
}

export default AnalyticsInstallations
