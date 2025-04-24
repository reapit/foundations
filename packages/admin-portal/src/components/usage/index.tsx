import { Loader, PageContainer, Title } from '@reapit/elements'
import React, { FC, useState } from 'react'
import { FilterForm } from './filter-form'
import { UsageTable } from './usage-table'
import { useReapitGet, GetActionNames, getActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { BillingBreakdownForMonthV2Model, Marketplace } from '@reapit/foundations-ts-definitions'
import { Statistics } from '../statistics'

export interface UsageFilters {
  month?: string
  developerId?: string
  customerId?: string
  appId?: string
}

export const UsagePage: FC = () => {
  const [usageFilters, setUsageFilters] = useState<UsageFilters>({})
  const { month, developerId, appId, customerId } = usageFilters

  const appIdFilter = appId ? { applicationId: appId } : {}
  const customerIdFilter = customerId ? { customerId } : {}

  const [billing, billingLoading] = useReapitGet<BillingBreakdownForMonthV2Model>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getBillingDataByMonth],
    queryParams: {
      developerId,
      type: 'trafficEvents',
      ...appIdFilter,
      ...customerIdFilter,
    },
    uriParams: { month },
    headers: {
      ['api-version']: '2',
    },
    fetchWhenTrue: [month && developerId],
  })

  const [apps] = useReapitGet<Marketplace.AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getApps],
    queryParams: {
      developerId,
      pageSize: 999,
    },
    fetchWhenTrue: [month && developerId],
  })

  const [installations] = useReapitGet<Marketplace.InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getInstallations],
    queryParams: {
      appId,
      isInstalled: true,
      pageSize: 999,
    },
    fetchWhenTrue: [month && developerId && appId],
  })

  const apiCalls = billing?.services?.find((item) => item.name === 'API Requests')?.items ?? []

  return (
    <PageContainer>
      <Title>API Usage</Title>
      <FilterForm setUsageFilters={setUsageFilters} apps={apps} installations={installations} />
      <Statistics area="BILLING" data={apiCalls} />
      {billingLoading ? <Loader /> : <UsageTable billing={billing} />}
    </PageContainer>
  )
}

export default UsagePage
