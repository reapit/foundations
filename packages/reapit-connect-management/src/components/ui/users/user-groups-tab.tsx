import React, { useState, useCallback } from 'react'
import useSWR from 'swr'
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import { GroupModelPagedResult, GroupModel } from '../../../types/organisations-schema'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { Pagination, Table, Loader, Section, FadeIn, Helper, H5, Button } from '@reapit/elements'
import Routes from '@/constants/routes'
import { URLS } from '../../../constants/api'
import qs from 'query-string'
import EditUserGroupModal from './edit-user-group'
import GroupMembersCell from './group-members-cell'

export const onPageChangeHandler = (history: History<any>) => (page: number) => {
  const queryString = `?pageNumber=${page}`
  return history.push(`${Routes.USERS_GROUPS}${queryString}`)
}

const UserGroupsTab: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const search = location.search
  const onPageChange = useCallback(onPageChangeHandler(history), [history])
  const [editingUserGroup, setEditingUserGroup] = useState<GroupModel>()

  const groupIds = qs.stringify({ id: window.reapit.config.groupIdsWhitelist }, { indices: false })
  const { data, mutate } = useSWR<GroupModelPagedResult | undefined>(
    `${URLS.USERS_GROUPS}/${search ? `${search}&${groupIds}&pageSize=12` : `?${groupIds}&pageSize=12`}`,
  )

  const ManageButton = ({
    cell: {
      row: { original },
    },
  }) => (
    <Button type="button" variant="info" onClick={() => setEditingUserGroup(original)}>
      Manage
    </Button>
  )

  const columns = [
    { Header: 'Group Name', accessor: 'id' },
    { Header: 'Description', accessor: 'description' },
    { Header: 'Members', Cell: GroupMembersCell },
    { Header: 'Manage', Cell: ManageButton },
  ]

  return (
    <ErrorBoundary>
      <Section>
        <H5>User groups</H5>
        <i>
          The list below contains all available member groups for your organisation. You can manage users associated to
          each group by selecting ‘Manage’.
        </i>
      </Section>
      {!data ? (
        <Loader />
      ) : (
        <>
          <UserGroupsContent data={data} columns={columns} onPageChange={onPageChange} />
          <EditUserGroupModal
            setEditingUserGroup={setEditingUserGroup}
            editingUserGroup={editingUserGroup}
            onRefetchData={mutate}
          />
        </>
      )}
    </ErrorBoundary>
  )
}

export const UserGroupsContent: React.FC<{
  data: GroupModelPagedResult
  columns: any[]
  onPageChange: (page: number) => void
}> = ({ data, columns, onPageChange }) => {
  const { _embedded: listGroup, totalCount, pageSize, pageNumber = 1 } = data
  return (
    <>
      <Section>{renderResult(columns, listGroup)}</Section>
      <Pagination onChange={onPageChange} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
    </>
  )
}

export const renderResult = (columns: any[], listGroup?: GroupModel[]) => {
  if (listGroup?.length === 0) {
    return (
      <FadeIn>
        <Helper variant="info">No Results</Helper>
      </FadeIn>
    )
  }

  return (
    <FadeIn>
      <Table expandable scrollable={true} data={listGroup || []} columns={columns} />
    </FadeIn>
  )
}

export default UserGroupsTab
