import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { ReduxState } from '@/types/core'
import { ResultState } from '@/reducers/result'
import { Pagination, Table, Button, H3, Info, H6, FlexContainerBasic, Section } from '@reapit/elements'
import { resultRequestData, ContactsParams, SearchParams } from '@/actions/result'
import Routes from '@/constants/routes'
import styles from '@/styles/pages/results.scss?mod'
import { oc } from 'ts-optchain'

export interface ResultMappedActions {
  fetchContacts: (params: ContactsParams) => void
}

export interface ResultMappedProps {
  resultState: ResultState
}

export type ResultProps = ResultMappedActions & ResultMappedProps & RouteComponentProps

export const generateColumns = history => () => [
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
        <Button type="button" variant="primary" onClick={() => history.push(`/checklist-detail/${row.original.id}`)}>
          Edit
        </Button>
      )
    }
  }
]

export const generateSearchTitle = (search: SearchParams | null) => () => {
  if (search) {
    return Object.values(search)
      .filter(value => value)
      .join(', ')
  }
}

export const fnChangePage = (setPageNumber: (page: number) => void) => (page: number) => {
  setPageNumber(page)
}

export const fnFetchContacts = (
  search: SearchParams | null,
  pageNumber: number,
  fetchContacts: (params: ContactsParams) => void
) => () => {
  if (search) {
    fetchContacts({ ...search, pageNumber })
  }
}

export const renderEmptyResult = () => (
  <FlexContainerBasic hasBackground flexColumn>
    <div>
      <Info infoType="">
        <H6>No Results found</H6>
      </Info>
    </div>
    <div className={styles.buttonNewSearchContainer}>
      <Link to={Routes.HOME}>
        <Button variant="info" type="button">
          New Search{' '}
        </Button>
      </Link>
    </div>
  </FlexContainerBasic>
)

export const Result: React.FunctionComponent<ResultProps> = ({ resultState, fetchContacts, history }) => {
  const { search, loading } = resultState
  const { totalCount, pageSize, data = [] } = oc<ResultState>(resultState).contacts({})
  const [pageNumber, setPageNumber] = React.useState<number>(1)

  const columns = React.useMemo(generateColumns(history), [data])

  const searchTitle = React.useMemo(generateSearchTitle(search), [search])

  const handleChangePage = React.useCallback(fnChangePage(setPageNumber), [pageNumber])

  React.useEffect(fnFetchContacts(search, pageNumber, fetchContacts), [search, pageNumber])

  return (
    <ErrorBoundary>
      {!search || Number(totalCount) === 0 ? (
        renderEmptyResult()
      ) : (
        <FlexContainerBasic hasPadding flexColumn>
          <FlexContainerBasic hasBackground flexColumn hasPadding isScrollable>
            {search && <H3>Show Results for '{searchTitle}'</H3>}
            <div className={styles.tableWrap}>
              <Table scrollable data={data} columns={columns} loading={loading} />
            </div>
            <Section>
              <Pagination
                pageNumber={pageNumber}
                pageSize={pageSize}
                totalCount={totalCount}
                onChange={handleChangePage}
              />
            </Section>
          </FlexContainerBasic>
        </FlexContainerBasic>
      )}
    </ErrorBoundary>
  )
}

export const mapStateToProps = (state: ReduxState): ResultMappedProps => ({
  resultState: state.result
})

export const mapDispatchToProps = (dispatch: any): ResultMappedActions => ({
  fetchContacts: (params: ContactsParams) => dispatch(resultRequestData(params))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Result)
)
