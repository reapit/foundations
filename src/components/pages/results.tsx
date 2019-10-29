import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { ReduxState } from '@/types/core'
import { ResultState } from '@/reducers/result'
import { Pagination, Table, Button, H3, FlexContainerResponsive, Info, H6 } from '@reapit/elements'
import { resultRequestData, ContactsParams } from '@/actions/result'
import Routes from '@/constants/routes'
import styles from '@/styles/pages/results.scss?mod'
import { oc } from 'ts-optchain'

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
          const addresses = (({ buildingName, buildingNumber, line1, line2 }) => ({
            buildingName,
            buildingNumber,
            line1,
            line2
          }))(row.original.addresses[0])

          return (
            <div>
              <span>
                {Object.values(addresses)
                  .filter(value => value)
                  .join(', ')}
              </span>
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
        id: 'identityCheck',
        accessor: d => d,
        Cell: ({ row }) => {
          return (
            <div>
              <span className={styles.columnText}>{row.original.identityCheck}</span>
            </div>
          )
        }
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

  const searchTitle = React.useMemo(() => {
    if (search) {
      return Object.values(search)
        .filter(value => value)
        .join(', ')
    }
  }, [search])

  const [pageNumber, setPageNumber] = React.useState<number>(1)

  const handleChangePage = React.useCallback(
    page => {
      setPageNumber(page)
    },
    [pageNumber]
  )

  React.useEffect(() => {
    if (search) {
      fetchContacts({ ...search, pageNumber })
    }
  }, [search, pageNumber])

  const renderEmptyResult = () => (
    <div>
      <div>
        <Info infoType="">
          <H6>No Results found</H6>
        </Info>
      </div>
      <div className={styles.buttonNewSearchContainer}>
        <Button variant="primary" type="button">
          <Link to={Routes.HOME}>New Search</Link>
        </Button>
      </div>
    </div>
  )

  return (
    <ErrorBoundary>
      <FlexContainerResponsive hasPadding flexColumn>
        {search && <H3>Show Results for '{searchTitle}'</H3>}
        {!search || Number(totalCount) === 0 ? (
          renderEmptyResult()
        ) : (
          <div className={styles.tableWrap}>
            <Table scrollable data={data} columns={columns} loading={loading} />
          </div>
        )}
        <Pagination pageNumber={pageNumber} pageSize={pageSize} totalCount={totalCount} onChange={handleChangePage} />
      </FlexContainerResponsive>
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
