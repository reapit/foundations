import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import ErrorBoundary from '../error-boundary'
import { DeveloperFilters, FilterForm } from './filter-form'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { Loader, PageContainer, Pagination, Title } from '@reapit/elements'
import { Statistics } from '../statistics'
import { objectToQuery, useReapitGet, GetActionNames, getActions } from '@reapit/use-reapit-data'
import { DevelopersTable } from './developers-table'

export const closeDisableMemberModal = (setDisableMemberModalVisible: Dispatch<SetStateAction<boolean>>) => () => {
  setDisableMemberModalVisible(false)
}

export const DevsManagement: FC = () => {
  const [developerFilters, setDeveloperFilters] = useState<DeveloperFilters>({})
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)

  const [developers, developersLoading, , refreshDevelopers] = useReapitGet<Marketplace.DeveloperModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getDevelopers],
    queryParams: { pageNumber, pageSize, ...objectToQuery(developerFilters) },
  })

  return (
    <ErrorBoundary>
      <PageContainer>
        <Title>Developers</Title>
        <FilterForm setDeveloperFilters={setDeveloperFilters} />
        {developersLoading ? (
          <Loader />
        ) : (
          <>
            <Statistics area="DEVELOPERS" data={developers} setPageSize={setPageSize} />
            <DevelopersTable developers={developers} refreshDevelopers={refreshDevelopers} />
            <Pagination
              callback={setPageNumber}
              currentPage={pageNumber}
              numberPages={Math.ceil((developers?.totalCount ?? 1) / 12)}
            />
          </>
        )}
      </PageContainer>
    </ErrorBoundary>
  )
}

export default DevsManagement
