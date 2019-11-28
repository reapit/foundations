import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { ReduxState } from '@/types/core'
import { ResultsState } from '@/reducers/results'
import { Pagination, Table, Button, H3, Info, H6, FlexContainerResponsive, FlexContainerBasic } from '@reapit/elements'
import { resultRequestData, ContactsParams } from '@/actions/results'
import Routes from '@/constants/routes'
import styles from '@/styles/pages/results.scss?mod'

export interface ResultMappedActions {
  fetchContacts: (params: ContactsParams) => void
}

export interface ResultMappedProps {
  resultsState: ResultsState
}

export type ResultProps = ResultMappedActions & ResultMappedProps & RouteComponentProps

export const handleUseEffect = ({ fetchContacts, pageNumber, search }) => () => {
  if (search) {
    fetchContacts({ ...search, pageNumber })
  }
}

export const backToHome = history => () => {
  history.push(Routes.SEARCH)
}

export const handleRedirectToRow = (history, row) => () => history.push(`${Routes.PROFILE}/${row.original.id}`)

export const generateColumn = history => () => [
  {
    Header: 'Name',
    id: 'name',
    accessor: value => `${value.forename} ${value.surname}`
  },
  {
    Header: 'Address',
    id: 'address',
    Cell: ({ row }) => {
      const addresses = (({ buildingName, buildingNumber, line1, line2 }) => ({
        buildingName,
        buildingNumber,
        line1,
        line2
      }))(row?.original?.addresses?.[0] || {})

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
    Cell: ({ row }) => {
      const postcode = row?.original?.addresses?.[0]?.postcode
      return (
        <div>
          <span>{postcode}</span>
        </div>
      )
    }
  },
  {
    Header: 'Status',
    id: 'identityCheck',
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
    Cell: ({ row }) => {
      return (
        <Button type="button" variant="primary" onClick={handleRedirectToRow(history, row)}>
          Edit
        </Button>
      )
    }
  }
]

export const handleUseCallback = setPageNumber => page => {
  setPageNumber(page)
}

export const Result: React.FunctionComponent<ResultProps> = ({ resultsState, fetchContacts, history }) => {
  const { search, loading } = resultsState
  const { totalCount, pageSize, data = [] } = resultsState?.contacts || {}
  const columns = React.useMemo(generateColumn(history), [])
  const searchTitle = React.useMemo(() => {
    if (search) {
      return Object.values(search)
        .filter(value => value)
        .join(', ')
    }
  }, [search])

  const [pageNumber, setPageNumber] = React.useState<number>(1)

  const handleChangePage = React.useCallback(handleUseCallback(setPageNumber), [pageNumber])

  React.useEffect(handleUseEffect({ fetchContacts, pageNumber, search }), [search, pageNumber])

  const renderEmptyResult = () => (
    <div>
      <div>
        <Info infoType="">
          <H6>No Results found</H6>
        </Info>
      </div>
      <div className={styles.buttonNewSearchContainer}>
        <Button onClick={backToHome(history)} variant="primary" type="button">
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

export const mapStateToProps = (state: ReduxState): ResultMappedProps => ({
  resultsState: state.results
})

export const mapDispatchToProps = (dispatch: any): ResultMappedActions => ({
  fetchContacts: (params: ContactsParams) => dispatch(resultRequestData(params))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Result))
