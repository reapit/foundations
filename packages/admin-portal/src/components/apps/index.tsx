import { Loader, PageContainer, Pagination, Title } from '@reapit/elements'
import React, { FC, useState } from 'react'
import { FilterForm } from './filter-form'
import { AppsTable } from './apps-table'
import { objectToQuery, useReapitGet, GetActionNames, getActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { Statistics } from '../statistics'

export interface AppsFilters {
  searchTerm?: string
  companyName?: string
  registeredFrom?: string
  registeredTo?: string
  publicListedDateFrom?: string
  publicListedDateTo?: string
  id?: string
  isPublic?: string
  isDirectApi?: string
  isListed?: string
  category?: string
  isChargedConsumption?: string
  externalAppId?: string
}

export const AppsPage: FC = () => {
  const [appsFilters, setAppsFilters] = useState<AppsFilters>({})
  const queryParams = objectToQuery({
    ...appsFilters,
    category: appsFilters.category?.split(','),
  })
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)

  const [apps, appsLoading, , appsRefresh] = useReapitGet<Marketplace.AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getApps],
    queryParams: {
      ...queryParams,
      pageNumber,
      pageSize,
    },
  })

  return (
    <PageContainer>
      <Title>Apps Management</Title>
      <FilterForm setAppsFilters={setAppsFilters} apps={apps} />
      {appsLoading ? (
        <Loader />
      ) : (
        <>
          <Statistics area="APPS" data={apps} setPageSize={setPageSize} />
          <AppsTable apps={apps} appsRefresh={appsRefresh} />
          <Pagination
            callback={setPageNumber}
            currentPage={pageNumber}
            numberPages={Math.ceil((apps?.totalCount ?? 1) / (apps?.pageSize ?? 1))}
          />
        </>
      )}
    </PageContainer>
  )
}

export default AppsPage
