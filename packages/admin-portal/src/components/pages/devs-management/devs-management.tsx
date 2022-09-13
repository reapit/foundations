import React from 'react'
import { History } from 'history'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import {
  Pagination,
  Table,
  Button,
  setQueryParams,
  toLocalTime,
  isEmptyObject,
  Alert,
  FlexContainerBasic,
} from '@reapit/elements-legacy'
import Routes from '@/constants/routes'
import DevsManagementFilterForm, { DevsManagementFilterFormValues } from '@/components/ui/devs-management-filter-form'
import { DeveloperModel, MemberModel } from '@reapit/foundations-ts-definitions'
import { fetchDeveloperList, FetchDeveloperListValues, fetchDeveloperMemberList } from '@/actions/devs-management'
import qs from 'querystring'
import { selectDeveloperListState } from '@/selector/admin'
import { Dispatch } from 'redux'
import { cleanObject } from '@reapit/utils-common'
import StatusModal from './set-status-modal/status-modal'
import DisableMemberModal from '@/components/ui/disable-member-modal'
import SetAsAdminModal from '@/components/ui/set-as-admin-modal'
import { FetchDeveloperMembersParams } from '@/services/developers'
import { CreateSubscriptionsButton } from '../../subscriptions/create-subscriptions'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { ApiKeys } from '../api-keys'
import dayjs from 'dayjs'
import { Loader, PageContainer, Title } from '@reapit/elements'

export const buildFilterValues = (queryParams: URLSearchParams): DevsManagementFilterFormValues => {
  const name = queryParams.get('name') || ''
  const company = queryParams.get('company') || ''
  const registeredFrom = queryParams.get('registeredFrom') || ''
  const registeredTo = queryParams.get('registeredTo') || ''
  const status = queryParams.get('status') || ''
  return { name, company, registeredFrom, registeredTo, status } as DevsManagementFilterFormValues
}

export const handleFetchData = (dispatch: Dispatch) => (requestData: FetchDeveloperListValues) => {
  dispatch(fetchDeveloperList(requestData))
}

export const handleFetchMemberData = (dispatch: Dispatch) => (requestData: FetchDeveloperMembersParams) => {
  dispatch(fetchDeveloperMemberList(requestData))
}

export const handleToggleVisibleModal = (setModalOpen: React.Dispatch<boolean>, isVisible: boolean) => () => {
  setModalOpen(isVisible)
}

export const onPageChangeHandler =
  (history: History<any>, queryParams: DevsManagementFilterFormValues) => (page: number) => {
    const query = setQueryParams(queryParams)
    let queryString = `?page=${page}`
    if (query && query !== '') {
      queryString = queryString.concat(`&${query}`)
    }
    return history.push(`${Routes.DEV_MANAGEMENT}${queryString}`)
  }

export const onSearchHandler =
  (history: History<any>) =>
  (queryParams: DevsManagementFilterFormValues, { setStatus }) => {
    const cleanedValues = cleanObject(queryParams)

    if (isEmptyObject(cleanedValues)) {
      setStatus('Please enter at least one search criteria')
      return
    }
    const query = setQueryParams(cleanedValues)
    if (query && query !== '') {
      const queryString = `?page=1&${query}`
      history.push(`${Routes.DEV_MANAGEMENT}${queryString}`)
    }
  }

export const closeDisableMemberModal =
  (setDisableMemberModalVisible: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    setDisableMemberModalVisible(false)
  }

export const openDisableMemberModal =
  (
    setSelectedUser: React.Dispatch<React.SetStateAction<MemberModel>>,
    setDisableMemberModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    user: MemberModel,
  ) =>
  () => {
    setSelectedUser(user)
    setDisableMemberModalVisible(true)
  }

export const onClickStatusButton =
  (setDeveloper: React.Dispatch<DeveloperModel>, setIsSetStatusModalOpen: React.Dispatch<boolean>, developerData) =>
  () => {
    setDeveloper({ ...developerData })
    setIsSetStatusModalOpen(true)
  }

export const DevsManagement: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const fetchData = handleFetchData(dispatch)
  const fetchMemberData = handleFetchMemberData(dispatch)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const queryParams = new URLSearchParams(location.search)
  const filterValues = buildFilterValues(queryParams)
  const onPageChange = React.useCallback(onPageChangeHandler(history, filterValues), [history, filterValues])
  const onSearch = React.useCallback(onSearchHandler(history), [history])
  const [isSetStatusModalOpen, setIsSetStatusModalOpen] = React.useState(false)
  const [isSetAdminModalOpen, setIsSetAdminModalOpen] = React.useState<boolean>(false)
  const [selectedUser, setSelectedUser] = React.useState<any>(null)
  const [developer, setDeveloper] = React.useState<DeveloperModel>({} as DeveloperModel)
  const [disableMemberModalVisible, setDisableMemberModalVisible] = React.useState<boolean>(false)
  const handleOpenSetAdminModal = handleToggleVisibleModal(setIsSetAdminModalOpen, true)
  const handleCloseSetAdminModal = handleToggleVisibleModal(setIsSetAdminModalOpen, false)
  const userEmail = connectSession?.loginIdentity?.email ?? ''
  const hasLimitedAccess = window.reapit.config.limitedUserAccessWhitelist.includes(userEmail)

  const DeveloperListState = useSelector(selectDeveloperListState)
  const { data, totalCount, pageSize, pageNumber = 1, isLoading } = DeveloperListState

  const resetModal = (succeed) => () => {
    setIsSetStatusModalOpen(false)
    setDeveloper({})
    if (succeed) {
      fetchData({ page: pageNumber, queryString: qs.stringify(filterValues as { name: string; company: string }) })
    }
  }

  const CreatedCell = ({ cell: { value } }) => <p>{toLocalTime(value)}</p>
  const StatusBtnCell = ({ row: { original } }) => {
    const activeUser = original.status === 'active'
    if (original.isMember) {
      return !hasLimitedAccess ? (
        <FlexContainerBasic centerContent flexColumn>
          {activeUser && (
            <a onClick={openDisableMemberModal(setSelectedUser, setDisableMemberModalVisible, original)}>Disable</a>
          )}

          {activeUser ? (
            <a
              data-test="button-cancel"
              className="text-ellipsis"
              onClick={() => {
                setSelectedUser(original)
                handleOpenSetAdminModal()
              }}
            >
              {original.role === 'user' ? 'Set Admin' : 'Unset Admin'}
            </a>
          ) : (
            'Inactive User'
          )}
        </FlexContainerBasic>
      ) : (
        <div>-</div>
      )
    }

    return (
      <Button
        type="button"
        variant="primary"
        onClick={onClickStatusButton(setDeveloper, setIsSetStatusModalOpen, original)}
      >
        Status
      </Button>
    )
  }

  const MembersBtnCell = ({ row: { original } }) => {
    if (original.isMember) {
      return null
    }

    return (
      <Button type="button" variant="primary" onClick={() => fetchMemberData({ id: original.id as string })}>
        Fetch Members
      </Button>
    )
  }

  const columns = [
    { Header: 'Company', accessor: 'company' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Job Title', accessor: 'jobTitle' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Phone', accessor: 'telephone' },
    {
      Header: 'Created',
      accessor: 'created',
      Cell: CreatedCell,
    },
    {
      Header: 'Status',
      accessor: 'status',
      columnProps: {
        className: 'capitalize',
      },
    },
    {
      Header: 'Agreed Terms Date',
      id: 'agreedTerms',
      Cell: ({ row }: { row: { original: DeveloperModel & { isMember: boolean } } }) => {
        return row.original.isMember && row.original.agreedTerms
          ? dayjs(row.original.agreedTerms).format('DD/MM/YYYY')
          : '-'
      },
    },
    {
      Header: '',
      id: 'buttonColumn',
      Cell: StatusBtnCell,
    },
    {
      Header: '',
      id: 'membersColumn',
      Cell: MembersBtnCell,
    },
    !hasLimitedAccess && {
      id: 'Subscribe',
      Cell: ({ row }: { row: { original: DeveloperModel & { isMember: boolean } } }) => {
        return !row.original.isMember ? (
          <CreateSubscriptionsButton subscriptionType="developerRegistration" developerId={row.original.id as string} />
        ) : null
      },
    },
    !hasLimitedAccess && {
      Header: '',
      id: 'apiKeyColumn',
      Cell: ({ row }: { row: { original: DeveloperModel & { isMember: boolean } } }) => {
        return !row.original.isMember ? (
          <ApiKeys developerId={row.original.id as string} email={row.original.email as string} />
        ) : null
      },
    },
  ].filter(Boolean)

  if (isLoading || !data) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <PageContainer>
        <Title>Developer Management</Title>
        <DevsManagementFilterForm filterValues={filterValues} onSearch={onSearch} />
        {renderResult(data, columns, totalCount)}
        <Pagination onChange={onPageChange} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
        <StatusModal visible={isSetStatusModalOpen} developer={developer} resetModal={resetModal} />
        <DisableMemberModal
          visible={disableMemberModalVisible}
          member={selectedUser}
          onCancel={closeDisableMemberModal(setDisableMemberModalVisible)}
          onSuccess={closeDisableMemberModal(setDisableMemberModalVisible)}
        />
        <SetAsAdminModal visible={isSetAdminModalOpen} onClose={handleCloseSetAdminModal} user={selectedUser} />
      </PageContainer>
    </ErrorBoundary>
  )
}

export const renderResult = (data, columns, totalCount) => {
  if (data?.length === 0) {
    return <Alert message="No Results " type="info" />
  }

  return (
    <>
      <div className="mb-4">Total: {totalCount}</div>
      <Table expandable scrollable={true} loading={false} data={data || []} columns={columns} />
    </>
  )
}

export default DevsManagement
