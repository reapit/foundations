import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { ReduxState } from '@/types/core'
import { ResultState } from '@/reducers/result'
import { Loader, Pagination } from '@reapit/elements'
import { resultRequestData, SearchParams, ContactsParams, resultSetSearchParams } from '@/actions/result'
import { oc } from 'ts-optchain'

export interface ResultMappedActions {
  fetchContacts: (params: ContactsParams) => void
  setSearchParams: (params: SearchParams) => void
}

export interface ResultMappedProps {
  resultState: ResultState
}

export type ResultProps = ResultMappedActions & ResultMappedProps & RouteComponentProps<{ page?: any }>

export const Result: React.FunctionComponent<ResultProps> = ({
  resultState,
  setSearchParams,
  fetchContacts,
  location
}) => {
  const { loading, search } = resultState
  const { totalCount, pageSize, data } = oc<ResultState>(resultState).contacts({})

  const [pageNumber, setPageNumber] = React.useState<number>(1)

  const handleChangePage = React.useCallback(
    page => {
      setPageNumber(page)
    },
    [pageNumber]
  )

  React.useEffect(() => {
    if (location.state) {
      setSearchParams(location.state)
    }
  }, [location])

  React.useEffect(() => {
    fetchContacts({ ...search, pageNumber })
  }, [search, pageNumber])

  if (loading) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <div>Result</div>
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): ResultMappedProps => ({
  resultState: state.result
})

const mapDispatchToProps = (dispatch: any): ResultMappedActions => ({
  fetchContacts: (params: ContactsParams) => dispatch(resultRequestData(params)),
  setSearchParams: (params: SearchParams) => dispatch(resultSetSearchParams(params))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Result)
)
