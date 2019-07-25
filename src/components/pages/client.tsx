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
import { appDetailRequestData } from '@/actions/app-detail'
import { AppDetailState } from '@/reducers/app-detail'
import AppDetailModal from '../ui/app-detail-modal'

export interface ClientMappedActions {
  fetchAppDetail: (id: string) => void
}

export interface ClientMappedProps {
  clientState: ClientState
  appDetail: AppDetailState
}

export type ClientProps = ClientMappedActions & ClientMappedProps & RouteComponentProps<{ page?: any }>

export const Client: React.FunctionComponent<ClientProps> = ({ clientState, match, fetchAppDetail, appDetail }) => {
  const pageNumber = match.params && !isNaN(match.params.page) ? Number(match.params.page) : 1
  const unfetched = !clientState.clientData
  const loading = clientState.loading
  const list = oc<ClientState>(clientState).clientData.data.data([])
  const { totalCount, pageSize } = oc<ClientState>(clientState).clientData.data({})
  const [visible, setVisible] = React.useState(false)

  if (unfetched && loading) {
    return <Loader />
  }
  return (
    <ErrorBoundary>
      <AppList
        list={list}
        loading={loading}
        onCardClick={app => {
          setVisible(true)
          if (app.id && (!appDetail.appDetailData || appDetail.appDetailData.data.id !== app.id)) {
            fetchAppDetail(app.id)
          }
        }}
      />
      <Pagination baseUrl={routes.CLIENT} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
      <AppDetailModal visible={visible} afterClose={() => setVisible(false)} />
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): ClientMappedProps => ({
  clientState: state.client,
  appDetail: state.appDetail
})

const mapDispatchToProps = (dispatch: any): ClientMappedActions => ({
  fetchAppDetail: (id: string) => dispatch(appDetailRequestData(id))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Client)
)
