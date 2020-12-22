import * as React from 'react'
import { Button, Grid, GridItem, H3, Helper, Loader, Section } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import AnalyticsCostExplorer from './analytics-cost-explorer'
import AnalyticsDailyUsage from './analytics-daily-usage'
import AnalyticsMonthlyUsage from './analytics-monthly-usage'
import { getCurrentSubscription, handleGetSubscriptions } from '../subscriptions/subscriptions-handlers'
import { useContext, useEffect, useState } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'
import { MessageContext } from '../../../context/message-context'
import AnalyticsUsageModal from './analytics-usage-modal'

export const AnalyticsPage: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionModelPagedResult>()
  const [subscriptionsLoading, setSubscriptionsLoading] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { setMessageState } = useContext(MessageContext)
  const developerId = connectSession?.loginIdentity?.developerId ?? null
  const currentSubscription = getCurrentSubscription(subscriptions, developerId)
  const handleModalClose = () => setModalVisible(false)
  const handleModalOpen = () => setModalVisible(true)

  useEffect(handleGetSubscriptions(setSubscriptions, setSubscriptionsLoading, setMessageState, developerId), [
    setSubscriptions,
    setSubscriptionsLoading,
    developerId,
  ])

  return (
    <ErrorBoundary>
      <Section className="justify-between items-center" isFlex>
        <H3 className="mb-0">Analytics</H3>
        <Button onClick={handleModalOpen} disabled={!currentSubscription}>
          Usage Limits
        </Button>
        <AnalyticsUsageModal visible={modalVisible} handleClose={handleModalClose} />
      </Section>
      {subscriptionsLoading ? (
        <Loader />
      ) : !currentSubscription ? (
        <Helper variant="info">
          You do not yet have a subscription to the Data Warehouse yet. Visit the Account page to get started.
        </Helper>
      ) : (
        <>
          <Grid isMultiLine>
            <GridItem className="is-half">
              <AnalyticsDailyUsage />
            </GridItem>
            <GridItem className="is-half">
              <AnalyticsMonthlyUsage />
            </GridItem>
          </Grid>
          <AnalyticsCostExplorer />
        </>
      )}
    </ErrorBoundary>
  )
}

export default AnalyticsPage
