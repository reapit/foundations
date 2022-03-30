import React, { FC } from 'react'
import { Loader, Title } from '@reapit/elements'
import { useAnalyticsState } from '../state/use-analytics-state'
import { BillingBreakdownForMonthV2Model } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { UsageTable } from './usage-table'
import { ServicesTable } from './services-table'

export const AnalyticsCosts: FC = () => {
  const { analyticsFilterState } = useAnalyticsState()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { clientId, appId, month } = analyticsFilterState
  const developerId = connectSession?.loginIdentity.developerId
  const appIdFilter = appId ? { applicationId: appId } : {}
  const customerIdFilter = clientId ? { customerId: clientId } : {}

  const [billing, billingLoading] = useReapitGet<BillingBreakdownForMonthV2Model>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getBillingDataByMonth],
    queryParams: {
      developerId,
      type: 'trafficEvents&type=dataWarehouseUsage&type=applicationListing&type=developerEdition&type=developerRegistration&type=dataWarehouse',
      ...appIdFilter,
      ...customerIdFilter,
    },
    uriParams: { month },
    headers: {
      ['api-version']: '2',
    },
    fetchWhenTrue: [month && developerId],
  })

  return (
    <>
      <Title>Costs</Title>
      {billingLoading ? <Loader /> : <UsageTable billing={billing} />}
      {billingLoading ? <Loader /> : <ServicesTable billing={billing} />}
    </>
  )
}

export default AnalyticsCosts
