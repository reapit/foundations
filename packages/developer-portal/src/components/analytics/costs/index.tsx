import React, { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react'
import {
  Button,
  ButtonGroup,
  FlexContainer,
  Loader,
  Subtitle,
  Title,
  useMediaQuery,
  useModal,
  useSnack,
} from '@reapit/elements'
import { AnalyticsFilterState, useAnalyticsState } from '../state/use-analytics-state'
import { BillingBreakdownForMonthV2Model } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import qs from 'qs'
import { UsageTable } from './usage-table'
import { ServicesTable } from './services-table'
import { ChartWrapper } from '../__styles__'
import { ServicesChart } from './services-chart'
import { DownloadResourcesTable } from './download-resources-table'
import { getMonthsRange, handleAggregateBillingData } from './utils'
import { batchFetchBillingService } from '../../../services/billing'
import { Controls } from '../page/controls'

export interface BillingState {
  loading: boolean
  billing: BillingBreakdownForMonthV2Model[]
}

export const handleFetchBilling =
  (
    analyticsFilterState: AnalyticsFilterState,
    setBillingState: Dispatch<SetStateAction<BillingState>>,
    error: (message: string) => void,
    developerId?: string | null,
  ) =>
  () => {
    const { clientId, appId } = analyticsFilterState
    const customerIdQuery = clientId ? { customerId: clientId } : {}
    const appIdQuery = appId ? { applicationId: appId } : {}
    const query = qs.stringify({ ...customerIdQuery, ...appIdQuery, developerId })
    const monthRequests = getMonthsRange(analyticsFilterState, 'YYYY-MM')

    const fetchBilling = async () => {
      setBillingState((currentState) => ({
        ...currentState,
        loading: true,
      }))
      const billing = await batchFetchBillingService(monthRequests, query)

      if (billing) {
        const filteredBilling = billing.filter(Boolean) as BillingBreakdownForMonthV2Model[]
        setBillingState({
          billing: filteredBilling,
          loading: false,
        })
      } else {
        error('Something went wrong fetching billing, this error has been logged')
        setBillingState({
          billing: [],
          loading: false,
        })
      }
    }

    if (monthRequests.length && developerId) {
      fetchBilling()
        .catch(error => console.error(error))
    }
  }

export const AnalyticsCosts: FC = () => {
  const { analyticsFilterState } = useAnalyticsState()
  const { Modal, openModal, closeModal } = useModal()
  const { isMobile } = useMediaQuery()
  const { error } = useSnack()
  const [billingState, setBillingState] = useState<BillingState>({
    loading: false,
    billing: [],
  })
  const { billing, loading } = billingState
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity.developerId
  const aggregatedBilling = useMemo(handleAggregateBillingData(billing), [billing])

  useEffect(handleFetchBilling(analyticsFilterState, setBillingState, error, developerId), [
    analyticsFilterState,
    developerId,
  ])

  return (
    <>
      <FlexContainer isFlexJustifyBetween>
        <Title>Costs</Title>
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
      <Subtitle>
        Total for period: £{aggregatedBilling.totalCost ? aggregatedBilling.totalCost.toFixed(2).padStart(2, '0') : '0'}
      </Subtitle>
      <FlexContainer isFlexWrap>
        <ChartWrapper>
          <Subtitle>Costs By Month</Subtitle>
          <ServicesChart />
        </ChartWrapper>
        <ChartWrapper>
          <Subtitle>Download Resources</Subtitle>
          {loading ? <Loader /> : <DownloadResourcesTable billing={aggregatedBilling} />}
        </ChartWrapper>
        <ChartWrapper>
          <Subtitle>API Calls</Subtitle>
          {loading ? <Loader /> : <UsageTable billing={aggregatedBilling} />}
        </ChartWrapper>
        <ChartWrapper>
          <Subtitle>Services and Subscriptions</Subtitle>
          {loading ? <Loader /> : <ServicesTable billing={aggregatedBilling} />}
        </ChartWrapper>
      </FlexContainer>
    </>
  )
}

export default AnalyticsCosts
