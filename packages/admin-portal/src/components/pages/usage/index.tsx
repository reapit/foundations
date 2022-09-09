import { Button, ButtonGroup, Loader, PageContainer, Title } from '@reapit/elements'
import React, { FC, useState } from 'react'
import { FilterForm } from './filter-form'
import { UsageTable } from './usage-table'
import { useReapitGet } from '@reapit/utils-react'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import {
  AppSummaryModelPagedResult,
  BillingBreakdownForMonthV2Model,
  InstallationModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import { downloadCSV } from '../statistics/statistics'

export interface UsageFilters {
  month?: string
  developerId?: string
  customerId?: string
  appId?: string
}

export const handleCsvDownload = (billing: BillingBreakdownForMonthV2Model | null) => () => {
  const apiCalls = billing?.services?.find((item) => item.name === 'API Requests')?.items ?? []
  downloadCSV('BILLING', apiCalls)
}

export const UsagePage: FC = () => {
  const [usageFilters, setUsageFilters] = useState<UsageFilters>({})
  const { month, developerId, appId, customerId } = usageFilters

  const appIdFilter = appId ? { applicationId: appId } : {}
  const customerIdFilter = customerId ? { customerId } : {}

  const [billing, billingLoading] = useReapitGet<BillingBreakdownForMonthV2Model>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getBillingDataByMonth],
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

  const [apps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: {
      developerId,
      pageSize: 999,
    },
    fetchWhenTrue: [month && developerId],
  })

  const [installations] = useReapitGet<InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getInstallations],
    queryParams: {
      appId,
      isInstalled: true,
      pageSize: 999,
    },
    fetchWhenTrue: [month && developerId && appId],
  })

  return (
    <PageContainer>
      <Title>API Usage</Title>
      <FilterForm setUsageFilters={setUsageFilters} apps={apps} installations={installations} />
      {billing && (
        <ButtonGroup alignment="right">
          <Button intent="primary" onClick={handleCsvDownload(billing)}>
            Download Results
          </Button>
        </ButtonGroup>
      )}
      {billingLoading ? <Loader /> : <UsageTable billing={billing} />}
    </PageContainer>
  )
}

export default UsagePage
