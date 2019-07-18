import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { ClientState } from '@/reducers/client'
import Loader from '@/components/ui/loader'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { withRouter, RouteComponentProps } from 'react-router'
import { oc } from 'ts-optchain'
import AppList from '@/components/ui/app-list'
import Pagination from '@/components/ui/pagination'
import routes from '@/constants/routes'

export interface ClientMappedActions {}

export interface ClientMappedProps {
  clientState: ClientState
}

export type ClientProps = ClientMappedActions & ClientMappedProps & RouteComponentProps<{ page?: any }>

export const Client: React.FunctionComponent<ClientProps> = ({ clientState, match }) => {
  const pageNumber = match.params && !isNaN(match.params.page) ? Number(match.params.page) : 9999
  const unfetched = !clientState.clientData
  const loading = clientState.loading
  const list = oc<ClientState>(clientState).clientData.data.data([])
  const { totalCount, pageSize } = oc<ClientState>(clientState).clientData.data({})

  if (unfetched && loading) {
    return <Loader />
  }
  return (
    <ErrorBoundary>
      <AppList list={list} loading={loading} />
      <Pagination baseUrl={routes.CLIENT} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): ClientMappedProps => ({
  clientState: state.client
})

const mapDispatchToProps = (dispatch: any): ClientMappedActions => ({})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Client)
)
