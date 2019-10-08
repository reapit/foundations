import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { ReduxState } from '@/types/core'
import { ResultState } from '@/reducers/result'
import { Pagination, Table, Button } from '@reapit/elements'
import { resultRequestData, ContactsParams } from '@/actions/result'
import { oc } from 'ts-optchain'
import bulma from '@/styles/vendor/bulma'

export interface ResultMappedActions {
  fetchContacts: (params: ContactsParams) => void
}

export interface ResultMappedProps {
  resultState: ResultState
}

export type ResultProps = ResultMappedActions & ResultMappedProps & RouteComponentProps<{ page?: any }>

export const Result: React.FunctionComponent<ResultProps> = ({ resultState, fetchContacts, history }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        id: 'name',
        accessor: d => `${d.forename} ${d.surname}`
      },
      {
        Header: 'Address',
        id: 'address',
        accessor: d => d,
        Cell: ({ row }) => {
          return (
            <div>
              <span>{row.original.addresses[0].line1}</span>
            </div>
          )
        }
      },
      {
        Header: 'Postcode',
        id: 'postcode',
        accessor: d => d,
        Cell: ({ row }) => {
          return (
            <div>
              <span>{row.original.addresses[0].postcode}</span>
            </div>
          )
        }
      },
      {
        Header: 'Status',
        accessor: 'identityCheck'
      },
      {
        Header: '',
        id: 'action',
        accessor: d => d,
        Cell: ({ row }) => {
          return (
            <Button
              type="button"
              variant="primary"
              onClick={() => history.push(`/checklist-detail/${row.original.id}`)}
            >
              Edit
            </Button>
          )
        }
      }
    ],
    []
  )
  const { search, loading } = resultState
  const { totalCount, pageSize, data = [] } = oc<ResultState>(resultState).contacts({})

  const [pageNumber, setPageNumber] = React.useState<number>(1)

  const handleChangePage = React.useCallback(
    page => {
      setPageNumber(page)
    },
    [pageNumber]
  )

  React.useEffect(() => {
    fetchContacts({ ...search, pageNumber })
  }, [search, pageNumber])

  return (
    <ErrorBoundary>
      <div className="my-5">
        <h3 className={`${bulma.title} ${bulma.is3}`}>Search Results</h3>
        <Table data={data} columns={columns} loading={loading} />
        <Pagination pageNumber={pageNumber} pageSize={pageSize} totalCount={totalCount} onChange={handleChangePage} />
      </div>
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): ResultMappedProps => ({
  resultState: state.result
})

const mapDispatchToProps = (dispatch: any): ResultMappedActions => ({
  fetchContacts: (params: ContactsParams) => dispatch(resultRequestData(params))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Result)
)
