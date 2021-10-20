import React, { useState, useCallback, useMemo, FC } from 'react'
import useSWR from 'swr'
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import { GroupModelPagedResult, GroupModel } from '../../../types/organisations-schema'
import ErrorBoundary from '@/components/hocs/error-boundary'
import Routes from '@/constants/routes'
import { URLS } from '../../../constants/api'
import qs from 'query-string'
import { Loader, Pagination, PersistantNotification, RowProps, Table } from '@reapit/elements'
import { Title } from '@reapit/elements'
import { cx } from '@linaria/core'
import { elFadeIn } from '@reapit/elements'
import { elMb11 } from '@reapit/elements'
import EditUserGroupForm from './edit-user-group'
import { useOrgId } from '../../../utils/use-org-id'

export const onPageChangeHandler = (history: History<any>) => (page: number) => {
  const queryString = `?pageNumber=${page}`
  return history.push(`${Routes.USERS_GROUPS}${queryString}`)
}

export const handleSortTableData = (groups: GroupModel[], orgId: string, onComplete: () => void) => (): RowProps[] => {
  return groups.map((group: GroupModel) => ({
    cells: [
      {
        label: 'Group Name',
        value: group.id ?? '',
        narrowTable: {
          showLabel: true,
        },
      },
      {
        label: 'Description',
        value: group.description ?? '',
        narrowTable: {
          showLabel: true,
        },
      },
      {
        label: 'Member Count',
        value: String(group.memberCount) ?? '',
        narrowTable: {
          showLabel: true,
        },
      },
    ],
    expandableContent: {
      content: <EditUserGroupForm userGroup={group} onComplete={onComplete} orgId={orgId} />,
    },
  }))
}

const UserGroupsTab: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const search = location.search
  const onPageChange = useCallback(onPageChangeHandler(history), [history])
  const [indexExpandedRow, setIndexExpandedRow] = useState<number | null>(null)
  const {
    orgIdState: { orgId },
  } = useOrgId()

  const groupIds = qs.stringify({ id: window.reapit.config.groupIdsWhitelist }, { indices: false })
  const { data, mutate } = useSWR<GroupModelPagedResult | undefined>(
    !orgId
      ? null
      : `${URLS.USERS_GROUPS}/${
          search
            ? `${search}&${groupIds}&pageSize=12&organisationId=${orgId}`
            : `?${groupIds}&pageSize=12&organisationId=${orgId}`
        }`,
  )

  const onComplete = () => {
    mutate()
    setIndexExpandedRow(null)
  }

  const groups = data?._embedded ?? []
  const totalPageCount = data?.totalPageCount ?? 0
  const pageNumber = data?.pageNumber ?? 0

  const rows = useMemo(handleSortTableData(groups, orgId ?? '', onComplete), [groups])

  return (
    <ErrorBoundary>
      <Title>User Groups</Title>
      {!data ? (
        <Loader />
      ) : groups.length ? (
        <>
          <Table
            className={cx(elFadeIn, elMb11)}
            rows={rows}
            indexExpandedRow={indexExpandedRow}
            setIndexExpandedRow={setIndexExpandedRow}
          />
          <Pagination callback={onPageChange} numberPages={totalPageCount} currentPage={pageNumber} />
        </>
      ) : (
        <PersistantNotification isFullWidth isExpanded intent="secondary" isInline>
          No users found
        </PersistantNotification>
      )}
    </ErrorBoundary>
  )
}

export default UserGroupsTab
