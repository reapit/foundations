import React, { useState, useEffect, useCallback } from 'react'
import useSWR from 'swr'
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import { UserModelPagedResult, UserModel } from '../../../types/organisations-schema'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { Pagination, Table, Loader, FadeIn, Helper, Button, H5, getMarketplaceGlobalsByKey } from '@reapit/elements'
import Routes from '@/constants/routes'
import { GLOSSARY_USER_ROLES_URL, URLS } from '../../../constants/api'
import EditUserModal from './edit-user'
import { orgIdEffectHandler } from '../../../utils/org-id-effect-handler'

export const onPageChangeHandler = (history: History<any>) => (page: number) => {
  const queryString = `?pageNumber=${page}`
  return history.push(`${Routes.USERS}${queryString}`)
}

const UsersTab: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const search = location.search
  const onPageChange = useCallback(onPageChangeHandler(history), [history])
  const [orgId, setOrgId] = useState<string | null>(null)
  const [editingUser, setEditingUser] = useState<UserModel>()
  const isDesktop = getMarketplaceGlobalsByKey()

  useEffect(orgIdEffectHandler(orgId, setOrgId), [])

  const { data, mutate } = useSWR<UserModelPagedResult | undefined>(
    orgId
      ? `${URLS.USERS}/${
          search ? `${search}&pageSize=12&organisationId=${orgId}` : `?pageSize=12&organisationId=${orgId}`
        }`
      : null,
  )

  const UserGroupCell = ({ cell: { value } }) => (
    <span>
      {value.map((group: string) => (
        <div key={group}>{group}</div>
      ))}
    </span>
  )

  const EditButton = ({
    cell: {
      row: { original },
    },
  }) => (
    <Button type="button" variant="primary" onClick={() => setEditingUser(original)}>
      Edit
    </Button>
  )

  const columns = [
    { Header: 'Name', accessor: 'name' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'User Groups', accessor: 'groups', Cell: UserGroupCell },
    { Header: 'Edit', Cell: EditButton },
  ]

  return (
    <ErrorBoundary>
      <H5>Existing users</H5>
      <p className="mb-4">
        The list below contains all &lsquo;Users&rsquo; within your organisation. You can search and edit users to
        manage the groups an individual user belongs to. For more information on ‘Groups’, please click{' '}
        {isDesktop ? (
          <a href={`agencycloud://process/webpage?url=${GLOSSARY_USER_ROLES_URL}`}>here.</a>
        ) : (
          <a target="_blank" rel="noopener noreferrer" href={GLOSSARY_USER_ROLES_URL}>
            here.
          </a>
        )}
      </p>

      {!data ? <Loader /> : <UsersContent data={data} columns={columns} onPageChange={onPageChange} />}
      {orgId && (
        <EditUserModal setEditingUser={setEditingUser} editingUser={editingUser} onRefetchData={mutate} orgId={orgId} />
      )}
    </ErrorBoundary>
  )
}

export const UsersContent: React.FC<{
  data: UserModelPagedResult
  columns: any[]
  onPageChange: (page: number) => void
}> = ({ data, columns, onPageChange }) => {
  const { _embedded: listUser, totalCount, pageSize, pageNumber = 1 } = data
  return (
    <>
      {renderResult(columns, listUser)}
      <Pagination onChange={onPageChange} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
    </>
  )
}

export const renderResult = (columns: any[], listUser?: UserModel[]) => {
  if (listUser?.length === 0) {
    return (
      <FadeIn>
        <Helper variant="info">No Results</Helper>
      </FadeIn>
    )
  }

  return (
    <FadeIn>
      <Table expandable scrollable={true} data={listUser || []} columns={columns} />
    </FadeIn>
  )
}

export default UsersTab
