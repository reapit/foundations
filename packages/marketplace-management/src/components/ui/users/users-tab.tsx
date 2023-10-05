import React, { useState, useCallback, useMemo, FC } from 'react'
import useSWR from 'swr'
import { useNavigate, useLocation, NavigateFunction } from 'react-router'
import { UserModelPagedResult, UserModel } from '@reapit/foundations-ts-definitions'
import Routes from '@/constants/routes'
import { URLS } from '../../../constants/api'
import {
  Button,
  ButtonGroup,
  elFadeIn,
  elMb11,
  FlexContainer,
  FormLayout,
  InputGroup,
  InputWrap,
  Loader,
  Pagination,
  PersistentNotification,
  RowProps,
  Table,
  Title,
  useMediaQuery,
  useModal,
} from '@reapit/elements'
import { cx } from '@linaria/core'
import EditUserForm from './edit-user'
import { useOrgId } from '../../../utils/use-org-id'
import { OrgIdSelect } from '../../hocs/org-id-select'
import qs from 'qs'
import { useForm } from 'react-hook-form'
import ErrorBoundary from '../../error-boundary'

export interface UserFilters {
  email?: string
  name?: string
}

export const onPageChangeHandler = (navigate: NavigateFunction) => (page: number) => {
  const queryString = `?pageNumber=${page}`
  return navigate(`${Routes.USERS}${queryString}`)
}

export const handleSortTableData = (users: UserModel[], orgId: string, onComplete: () => void) => (): RowProps[] => {
  return users.map((user: UserModel) => ({
    cells: [
      {
        label: 'Name',
        value: user.name ?? '',
        narrowTable: {
          showLabel: true,
        },
      },
      {
        label: 'Email',
        value: user.email ?? '',
        narrowTable: {
          showLabel: true,
        },
      },
      {
        label: 'Groups',
        value:
          user.groups
            ?.map((group) => {
              if (process.env.groupIdsWhitelist.includes(group)) return group
            })
            .filter(Boolean)
            .join(', ') ?? '',
        narrowTable: {
          showLabel: true,
        },
      },
    ],
    expandableContent: {
      content: <EditUserForm user={user} onComplete={onComplete} orgId={orgId} />,
    },
  }))
}

const UsersTab: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { Modal, openModal, closeModal } = useModal()
  const [userSearch, setUserSearch] = useState<UserFilters>({})
  const { isMobile } = useMediaQuery()
  const onPageChange = useCallback(onPageChangeHandler(navigate), [navigate])
  const [indexExpandedRow, setIndexExpandedRow] = useState<number | null>(null)
  const { register, handleSubmit } = useForm<UserFilters>({ mode: 'all' })
  const {
    orgIdState: { orgId, orgName },
  } = useOrgId()
  const search = qs.stringify(userSearch, { addQueryPrefix: true })
  const urlParams = new URLSearchParams(location.search)
  const pageQuery = urlParams.get('pageNumber')
  const pageNumber = pageQuery ? Number(pageQuery) : 1

  const { data, mutate } = useSWR<UserModelPagedResult | undefined>(
    orgId
      ? `${URLS.USERS}/${
          search
            ? `${search}&pageSize=12&pageNumber=${pageNumber}&organisationId=${orgId}`
            : `?pageSize=12&pageNumber=${pageNumber}&organisationId=${orgId}`
        }`
      : null,
  )

  const users = data?._embedded ?? []
  const totalPageCount = data?.totalPageCount ?? 0

  const onComplete = () => {
    // Set timeout as a workaround for RDS replication error.
    setTimeout(() => {
      mutate()
    }, 1000)
    setIndexExpandedRow(null)
  }

  const rows = useMemo(handleSortTableData(users, orgId ?? '', onComplete), [users])

  return (
    <ErrorBoundary>
      <FlexContainer isFlexJustifyBetween>
        {!orgName ? <Title>Users</Title> : <Title>{orgName} Users</Title>}
        {isMobile && (
          <ButtonGroup alignment="right">
            <Button intent="default" onClick={openModal}>
              Select Org
            </Button>
            <Modal title="Select Organisation">
              <OrgIdSelect />
              <ButtonGroup alignment="center">
                <Button intent="primary" onClick={closeModal}>
                  Close
                </Button>
              </ButtonGroup>
            </Modal>
          </ButtonGroup>
        )}
      </FlexContainer>
      <form onChange={handleSubmit(setUserSearch)}>
        <FormLayout hasMargin>
          <InputWrap>
            <InputGroup {...register('email')} placeholder="Search for a user" label="Email" />
          </InputWrap>
          <InputWrap>
            <InputGroup {...register('name')} placeholder="Search for a user" label="Name" />
          </InputWrap>
        </FormLayout>
      </form>
      {!data && orgId ? (
        <Loader />
      ) : users.length && orgId ? (
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
        <PersistentNotification isFullWidth isExpanded intent="primary" isInline>
          No users found
        </PersistentNotification>
      ) : (
        <PersistentNotification isFullWidth isExpanded intent="primary" isInline>
          No organisation selected. You need to select an organisation to view users.
        </PersistentNotification>
      )}
    </ErrorBoundary>
  )
}

export default UsersTab
