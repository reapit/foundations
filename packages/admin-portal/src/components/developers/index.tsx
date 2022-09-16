import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import ErrorBoundary from '../error-boundary'
import { DeveloperFilters, FilterForm } from './filter-form'
import { DeveloperModel, DeveloperModelPagedResult, MemberModel } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { Loader, PageContainer, Pagination, Title } from '@reapit/elements'
import { Statistics } from '../statistics'
import { objectToQuery, useReapitGet } from '@reapit/utils-react'
import { DevelopersTable } from './developers-table'

export const closeDisableMemberModal = (setDisableMemberModalVisible: Dispatch<SetStateAction<boolean>>) => () => {
  setDisableMemberModalVisible(false)
}

export const openDisableMemberModal =
  (
    setSelectedUser: Dispatch<SetStateAction<MemberModel>>,
    setDisableMemberModalVisible: Dispatch<SetStateAction<boolean>>,
    user: MemberModel,
  ) =>
  () => {
    setSelectedUser(user)
    setDisableMemberModalVisible(true)
  }

export const onClickStatusButton =
  (setDeveloper: Dispatch<DeveloperModel>, setIsSetStatusModalOpen: Dispatch<boolean>, developerData) => () => {
    setDeveloper({ ...developerData })
    setIsSetStatusModalOpen(true)
  }

export const DevsManagement: FC = () => {
  const [developerFilters, setDeveloperFilters] = useState<DeveloperFilters>({})
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(12)

  const [developers, developersLoading, , refreshDevelopers] = useReapitGet<DeveloperModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getDevelopers],
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
