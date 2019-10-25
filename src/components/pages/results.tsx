import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { ReduxState } from '@/types/core'
import { ResultsState } from '@/reducers/results'
import { Pagination, Table, Button, H3, Info, H6, FlexContainerResponsive, FlexContainerBasic } from '@reapit/elements'
import { resultRequestData, ContactsParams } from '@/actions/results'
import { oc } from 'ts-optchain'
import Routes from '@/constants/routes'
import styles from '@/styles/pages/results.scss?mod'

export interface ResultMappedActions {
  fetchContacts: (params: ContactsParams) => void
}

export interface ResultMappedProps {
  resultsState: ResultsState
}

export type ResultProps = ResultMappedActions & ResultMappedProps & RouteComponentProps

export const Result: React.FunctionComponent<ResultProps> = ({ resultsState, fetchContacts, history }) => {
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
              <span className="capitalize">{row.original.identityCheck}</span>
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
              onClick={() => history.push(`${Routes.PROFILE}/${row.original.id}`)}
            >
              Edit
            </Button>
          )
        }
      }
    ],
    []
  )
  const { search, loading } = resultsState
  const { totalCount, pageSize, data = [] } = oc<ResultsState>(resultsState).contacts({})

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

  const backToHome = () => {
    history.push(Routes.SEARCH)
  }

  const renderEmptyResult = () => (
    <div>
      <div>
        <Info infoType="">
          <H6>No Results found</H6>
        </Info>
      </div>
      <div className={styles.buttonNewSearchContainer}>
        <Button onClick={backToHome} variant="primary" type="button">
          New Search
        </Button>
      </div>
    </div>
  )

  return (
    <ErrorBoundary>
      <FlexContainerBasic hasPadding flexColumn>
        <div>
          <FlexContainerResponsive hasBackground flexColumn hasPadding>
            {search && <H3>Showing Results for '{searchTitle}'</H3>}
            {!search || Number(totalCount) === 0 ? (
              renderEmptyResult()
            ) : (
              <Table scrollable loading={loading} data={data} columns={columns} />
            )}
            <Pagination
              pageNumber={pageNumber}
              pageSize={pageSize}
              totalCount={totalCount}
              onChange={handleChangePage}
            />
          </FlexContainerResponsive>
        </div>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): ResultMappedProps => ({
  resultsState: state.results
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
