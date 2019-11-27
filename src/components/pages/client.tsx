import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { ClientState } from '@/reducers/client'
import { Loader, FlexContainerBasic } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { withRouter, RouteComponentProps } from 'react-router'
import AppList from '@/components/ui/app-list'
import AppSidebar from '@/components/ui/app-sidebar'
import routes from '@/constants/routes'
import { appDetailRequestData } from '@/actions/app-detail'
import { AppDetailState } from '@/reducers/app-detail'
import AppDetailModal from '@/components/ui/app-detail-modal'
import { selectClientId } from '@/selector/client'
import { AppSummaryModel } from '@/types/marketplace-api-schema'

export interface ClientMappedActions {
  fetchAppDetail: (id: string, clientId: string) => void
}

export interface ClientMappedProps {
  clientState: ClientState
  appDetail: AppDetailState
  clientId: string
}

export const handleAfterClose = ({ setVisible }) => () => setVisible(false)
export const handleOnChange = history => (page: number) => history.push(`${routes.CLIENT}/${page}`)
export const handleOnCardClick = ({ setVisible, appDetail, fetchAppDetail, clientId }) => (app: AppSummaryModel) => {
  setVisible(true)
  if (app.id && (!appDetail.appDetailData || appDetail.appDetailData.data.id !== app.id)) {
    fetchAppDetail(app.id, clientId)
  }
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
  const list = clientState?.clientData?.data?.data || []
  const { totalCount, pageSize } = clientState?.clientData?.data || {}
  const [visible, setVisible] = React.useState(false)

  return (
    <ErrorBoundary>
      <div className="columns is-vcentered">
        <AppSidebar />
        {unfetched || loading ? (
          <Loader />
        ) : (
          <AppList
            list={list}
            title="Featured Apps"
            loading={loading}
            onCardClick={handleOnCardClick({ setVisible, appDetail, fetchAppDetail, clientId })}
            infoType="CLIENT_APPS_EMPTY"
            pagination={{
              totalCount,
              pageSize,
              pageNumber,
              onChange: handleOnChange(history)
            }}
          />
        )}
      </div>
      <AppDetailModal visible={visible} afterClose={handleAfterClose({ setVisible })} />
    </ErrorBoundary>
  )
}

export const mapStateToProps = (state: ReduxState): ClientMappedProps => ({
  clientState: state.client,
  appDetail: state.appDetail,
  clientId: selectClientId(state)
})

export const mapDispatchToProps = (dispatch: any): ClientMappedActions => ({
  fetchAppDetail: (id: string, clientId: string) => dispatch(appDetailRequestData({ id, clientId }))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Client))
