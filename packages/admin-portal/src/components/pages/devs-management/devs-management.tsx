import React from 'react'
import { History } from 'history'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import {
  Pagination,
  Table,
  Button,
  Loader,
  setQueryParams,
  H3,
  toLocalTime,
  isEmptyObject,
  Section,
  Alert,
  FlexContainerBasic,
} from '@reapit/elements'
import Routes from '@/constants/routes'
import DevsManagementFilterForm, { DevsManagementFilterFormValues } from '@/components/ui/devs-management-filter-form'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { fetchDeveloperList, fetchDeveloperListValues, fetchDeveloperMemberList } from '@/actions/devs-management'
import qs from 'querystring'
import { selectDeveloperListState } from '@/selector/admin'
import { Dispatch } from 'redux'
import { cleanObject } from '@reapit/utils'
import StatusModal from './set-status-modal/status-modal'
import DisableMemberModal from '@/components/ui/disable-member-modal'
import SetAsAdminModal from '@/components/ui/set-as-admin-modal'
import { FetchOrganisationMembersParams } from '@/services/developers'

export const buildFilterValues = (queryParams: URLSearchParams): DevsManagementFilterFormValues => {
  const name = queryParams.get('name') || ''
  const company = queryParams.get('company') || ''
  const registeredFrom = queryParams.get('registeredFrom') || ''
  const registeredTo = queryParams.get('registeredTo') || ''
  return { name, company, registeredFrom, registeredTo } as DevsManagementFilterFormValues
}

export const handleFetchData = (dispatch: Dispatch) => (requestData: fetchDeveloperListValues) => {
  dispatch(fetchDeveloperList(requestData))
}

export const handleFetchMemberData = (dispatch: Dispatch) => (requestData: FetchOrganisationMembersParams) => {
  dispatch(fetchDeveloperMemberList(requestData))
}

export const handleToggleVisibleModal = (setModalOpen: React.Dispatch<boolean>, isVisible: boolean) => () => {
  setModalOpen(isVisible)
}

export const onPageChangeHandler = (history: History<any>, queryParams: DevsManagementFilterFormValues) => (
  page: number,
) => {
  const query = setQueryParams(queryParams)
  let queryString = `?page=${page}`
  if (query && query !== '') {
    queryString = queryString.concat(`&${query}`)
  }
  return history.push(`${Routes.DEV_MANAGEMENT}${queryString}`)
}

export const onSearchHandler = (history: History<any>) => (
  queryParams: DevsManagementFilterFormValues,
  { setStatus },
) => {
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

export const closeDisableMemberModal = (
  setDisableMemberModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
) => () => {
  setDisableMemberModalVisible(false)
}

export const openDisableMemberModal = (setSelectedUser, setDisableMemberModalVisible, user) => () => {
  setSelectedUser(user)
  setDisableMemberModalVisible(true)
}

export const onClickStatusButton = (
  setDeveloper: React.Dispatch<DeveloperModel>,
  setIsSetStatusModalOpen: React.Dispatch<boolean>,
  developerData,
) => () => {
  setDeveloper({ ...developerData })
  setIsSetStatusModalOpen(true)
}

export const DevsManagement: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const fetchData = handleFetchData(dispatch)
  const fetchMemberData = handleFetchMemberData(dispatch)
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

  const DeveloperListState = useSelector(selectDeveloperListState)
  const { data, totalCount, pageSize, pageNumber = 1, isLoading } = DeveloperListState

  const resetModal = succeed => () => {
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
      return (
        <FlexContainerBasic centerContent flexColumn>
          {activeUser && (
            <a onClick={openDisableMemberModal(setSelectedUser, setDisableMemberModalVisible, original)}>Disable</a>
          )}

          {activeUser ? (
            <a
              data-test="button-cancel"
              // className={hyperlinked}
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
      Header: '',
      id: 'buttonColumn',
      Cell: StatusBtnCell,
    },
    {
      Header: '',
      id: 'membersColumn',
      Cell: MembersBtnCell,
    },
  ]

  if (isLoading || !data) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <Section className="mb-0">
        <H3>Developer Management</H3>
      </Section>
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
    </ErrorBoundary>
  )
}

export const renderResult = (data, columns, totalCount) => {
  if (data?.length === 0) {
    return <Alert message="No Results " type="info" />
  }

  return (
    <>
      <Section>
        <div>Total: {totalCount}</div>
      </Section>
      <Section>
        <Table expandable scrollable={true} loading={false} data={data || []} columns={columns} />
      </Section>
    </>
  )
}

export default DevsManagement
