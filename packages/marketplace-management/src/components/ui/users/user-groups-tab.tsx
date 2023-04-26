import React, { useState, useCallback, useMemo, FC } from 'react'
import useSWR from 'swr'
import { useNavigate, useLocation, NavigateFunction } from 'react-router'
import { GroupModelPagedResult, GroupModel } from '@reapit/foundations-ts-definitions'
import Routes from '@/constants/routes'
import { URLS } from '../../../constants/api'
import qs from 'query-string'
import {
  Button,
  ButtonGroup,
  FlexContainer,
  Loader,
  Pagination,
  PersistentNotification,
  RowProps,
  Table,
  useMediaQuery,
  useModal,
} from '@reapit/elements'
import { Title } from '@reapit/elements'
import { cx } from '@linaria/core'
import { elFadeIn } from '@reapit/elements'
import { elMb11 } from '@reapit/elements'
import EditUserGroupForm from './edit-user-group'
import { useOrgId } from '../../../utils/use-org-id'
import { OrgIdSelect } from '../../hocs/org-id-select'
import ErrorBoundary from '../../error-boundary'

export const onPageChangeHandler = (navigate: NavigateFunction) => (page: number) => {
  const queryString = `?pageNumber=${page}`
  return navigate(`${Routes.USERS_GROUPS}${queryString}`)
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
  const navigate = useNavigate()
  const location = useLocation()
  const { Modal, openModal, closeModal } = useModal()
  const { isMobile } = useMediaQuery()
  const search = location.search
  const onPageChange = useCallback(onPageChangeHandler(navigate), [navigate])
  const [indexExpandedRow, setIndexExpandedRow] = useState<number | null>(null)
  const {
    orgIdState: { orgId, orgName },
  } = useOrgId()

  const groupIds = qs.stringify({ id: process.env.groupIdsWhitelist }, { indices: false })
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
    // Set timeout as a workaround for RDS replication error.
    setTimeout(() => {
      mutate()
    }, 1000)
    setIndexExpandedRow(null)
  }

  const groups = data?._embedded ?? []
  const totalPageCount = data?.totalPageCount ?? 0
  const pageNumber = data?.pageNumber ?? 0

  const rows = useMemo(handleSortTableData(groups, orgId ?? '', onComplete), [groups])

  return (
    <ErrorBoundary>
      <FlexContainer isFlexJustifyBetween>
        {!orgName ? <Title>User Groups</Title> : <Title>{orgName} User Groups</Title>}
        {isMobile && (
          <ButtonGroup alignment="right">
            <Button intent="low" onClick={openModal}>
              Select Org
            </Button>
            <Modal title="Select Organisation">
              <OrgIdSelect />
              <ButtonGroup alignment="center">
                <Button intent="secondary" onClick={closeModal}>
                  Close
                </Button>
              </ButtonGroup>
            </Modal>
          </ButtonGroup>
        )}
      </FlexContainer>
      {!data && orgId ? (
        <Loader />
      ) : groups.length && orgId ? (
        <>
          <Table
            className={cx(elFadeIn, elMb11)}
            rows={rows}
            indexExpandedRow={indexExpandedRow}
            setIndexExpandedRow={setIndexExpandedRow}
          />
          <Pagination callback={onPageChange} numberPages={totalPageCount} currentPage={pageNumber} />
        </>
      ) : orgId ? (
        <PersistentNotification isFullWidth isExpanded intent="secondary" isInline>
          No users found
        </PersistentNotification>
      ) : (
        <PersistentNotification isFullWidth isExpanded intent="secondary" isInline>
          No organisation selected. You need to select an organisation to view user groups.
        </PersistentNotification>
      )}
    </ErrorBoundary>
  )
}

export default UserGroupsTab
