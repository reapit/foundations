import * as React from 'react'
import { History } from 'history'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps, match } from 'react-router'
import { ReduxState } from '@/types/core'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { AdminDevManamgenetState } from '@/reducers/admin-dev-management'
import ErrorBoundary from '@/components/hocs/error-boundary'
import {
  Pagination,
  Table,
  Info,
  FlexContainerResponsive,
  Button,
  Loader,
  Section,
  setQueryParams
} from '@reapit/elements'
import Routes from '@/constants/routes'
import AdminDevManagementFilterForm, {
  AdminDevManagementFilterFormValues
} from '@/components/ui/admin-dev-management-filter-form'
import AdminDeleteDeveloperModal from '@/components/ui/developer-delete'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'

export interface AdminDevManagementProps {
  adminDevManagementState: AdminDevManamgenetState
  filterValues: AdminDevManagementFilterFormValues
  onPageChange: any
  onSearch: any
}

export const AdminDevManagement: React.FC<AdminDevManagementProps> = ({
  adminDevManagementState,
  filterValues,
  onPageChange,
  onSearch
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false)
  const [developerId, setDeveloperId] = React.useState('')
  const [developerName, setDeveloperName] = React.useState('')

  const resetModal = () => {
    setIsDeleteModalOpen(false)
    setDeveloperId('')
    setDeveloperName('')
  }

  const { loading, data } = adminDevManagementState
  const pageNumber = data?.pageNumber || 1

  const columns = [
    {
      Header: '#',
      id: 'id',
      Cell: ({ row: { index } }) => <>{(pageNumber - 1) * REVISIONS_PER_PAGE + index + 1}</>
    },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Company', accessor: 'company' },
    { Header: 'Job Title', accessor: 'jobTitle' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Phone', accessor: 'telephone' },
    {
      Header: '',
      id: 'buttonColumn',
      Cell: ({ row: { original } }) => {
        const { id, name } = original as DeveloperModel

        return (
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              if (id && name) {
                setDeveloperId(id)
                setDeveloperName(name)
                setIsDeleteModalOpen(true)
              }
            }}
          >
            Delete
          </Button>
        )
      }
    }
  ]

  if (loading || !data) {
    return <Loader />
  }

  if (!loading && data?.data?.length === 0) {
    return <Info infoType="" />
  }

  return (
    <ErrorBoundary>
      <FlexContainerResponsive>
        <Section>
          <AdminDevManagementFilterForm filterValues={filterValues} onSearch={onSearch} />
          <Table loading={false} data={data.data} columns={columns} />
          <Pagination
            onChange={onPageChange}
            totalCount={data.totalCount}
            pageSize={data.pageSize}
            pageNumber={data.pageNumber}
          />
        </Section>
      </FlexContainerResponsive>

      <AdminDeleteDeveloperModal
        visible={isDeleteModalOpen}
        afterClose={resetModal}
        onDeleteSuccess={resetModal}
        developerId={developerId}
        developerName={developerName}
      />
    </ErrorBoundary>
  )
}

export const onPageChangeHandler = (history: History<any>, queryParams: AdminDevManagementFilterFormValues) => (
  page: number
) => {
  const query = setQueryParams(queryParams) ? `?${setQueryParams(queryParams)}` : ''

  return history.push(`${Routes.ADMIN_DEV_MANAGEMENT}/${page}${query}`)
}

export const onSearchHandler = (history: History<any>, match: match<{ page?: any }>) => (
  queryParams: AdminDevManagementFilterFormValues
) => {
  const page = match.params.page || 1
  const query = setQueryParams(queryParams) ? `?${setQueryParams(queryParams)}` : ''

  return history.push(`${Routes.ADMIN_DEV_MANAGEMENT}/${page}${query}`)
}

export const mapStateToProps = (state: ReduxState, ownState: RouteComponentProps<any>) => {
  const { history, match } = ownState
  const queryParams = new URLSearchParams(ownState.location.search)
  const name = queryParams.get('name') || ''
  const company = queryParams.get('company') || ''
  const filterValues = { name, company } as AdminDevManagementFilterFormValues

  return {
    adminDevManagementState: state.adminDevManagement,
    filterValues,
    onPageChange: onPageChangeHandler(history, filterValues),
    onSearch: onSearchHandler(history, match)
  }
}

export const mapDispatchToProps = () => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminDevManagement))
