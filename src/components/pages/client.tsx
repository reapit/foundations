import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { ClientState } from '@/reducers/client'
import { Loader, Pagination } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { withRouter, RouteComponentProps } from 'react-router'
import { oc } from 'ts-optchain'
import AppList from '@/components/ui/app-list'
import routes from '@/constants/routes'
import { appDetailRequestData } from '@/actions/app-detail'
import { AppDetailState } from '@/reducers/app-detail'
import AppDetailModal from '@/components/ui/app-detail-modal'
import { selectClientId } from '@/selector/client'

export interface ClientMappedActions {
  fetchAppDetail: (id: string, clientId: string) => void
}

export interface ClientMappedProps {
  clientState: ClientState
  appDetail: AppDetailState
  clientId: string
}

export type ClientProps = ClientMappedActions & ClientMappedProps & RouteComponentProps<{ page?: any }>

export const Client: React.FunctionComponent<ClientProps> = ({
  clientState,
  match,
  history,
  fetchAppDetail,
  appDetail,
  clientId
}) => {
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
        title="Browse Apps"
        loading={loading}
        onCardClick={app => {
          setVisible(true)
          if (app.id && (!appDetail.appDetailData || appDetail.appDetailData.data.id !== app.id)) {
            fetchAppDetail(app.id, clientId)
          }
        }}
      />
      <Pagination
        onChange={page => history.push(`${routes.CLIENT}/${page}`)}
        totalCount={totalCount}
        pageSize={pageSize}
        pageNumber={pageNumber}
      />
      <AppDetailModal visible={visible} afterClose={() => setVisible(false)} />
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): ClientMappedProps => ({
  clientState: state.client,
  appDetail: state.appDetail,
  clientId: selectClientId(state)
})

const mapDispatchToProps = (dispatch: any): ClientMappedActions => ({
  fetchAppDetail: (id: string, clientId: string) => dispatch(appDetailRequestData({ id, clientId }))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Client)
)
