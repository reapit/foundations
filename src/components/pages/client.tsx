import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState, FormState } from '@/types/core'
import { ClientState } from '@/reducers/client'
import { Loader } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { withRouter, RouteComponentProps } from 'react-router'
import AppList from '@/components/ui/app-list'
import AppSidebar from '@/components/ui/app-sidebar'
import { appDetailRequestData } from '@/actions/app-detail'
import { AppDetailState } from '@/reducers/app-detail'
import AppDetailModal from '@/components/ui/app-detail-modal'
import { selectClientId } from '@/selector/client'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/pages/client.scss?mod'
import { appInstallationsSetFormState } from '@/actions/app-installations'

import { addQuery, getParamValueFromPath, hasFilterParams } from '@/utils/client-url-params'
import { setAppDetailModalStateBrowse } from '@/actions/app-detail-modal'

export interface ClientMappedActions {
  setStateViewBrowse: () => void
  fetchAppDetail: (id: string, clientId: string) => void
  installationsSetFormState: (formState: FormState) => void
}

export interface ClientMappedProps {
  clientState: ClientState
  appDetail: AppDetailState
  clientId: string
  installationsFormState: FormState
}

export const handleAfterClose = ({ setVisible }) => () => setVisible(false)
export const handleOnChange = history => (page: number) => {
  history.push(addQuery({ page }))
}
export const handleOnCardClick = ({ setVisible, setStateViewBrowse, appDetail, fetchAppDetail, clientId }) => (
  app: AppSummaryModel
) => {
  setVisible(true)
  setStateViewBrowse()
  if (app.id && (!appDetail.appDetailData || appDetail.appDetailData.data.id !== app.id)) {
    fetchAppDetail(app.id, clientId)
  }
}

export const handleInstallationDone = ({
  isDone,
  installationsSetFormState,
  fetchAppDetail,
  appDetail,
  clientId
}) => () => {
  if (isDone) {
    installationsSetFormState('PENDING')
    fetchAppDetail(appDetail.appDetailData.data.id, clientId)
  }
}

export type ClientProps = ClientMappedActions & ClientMappedProps & RouteComponentProps<{ page?: any }>

export const Client: React.FunctionComponent<ClientProps> = ({
  clientState,
  history,
  location,
  fetchAppDetail,
  appDetail,
  clientId,
  setStateViewBrowse,
  installationsFormState,
  installationsSetFormState
}) => {
  const pageNumber =
    !isNaN(Number(getParamValueFromPath(location.search, 'page'))) &&
    Number(getParamValueFromPath(location.search, 'page')) > 0
      ? Number(getParamValueFromPath(location.search, 'page'))
      : 1
  const hasParams = hasFilterParams(location.search)
  const unfetched = !clientState.clientData
  const loading = clientState.loading
  const apps = clientState?.clientData?.apps?.data || []
  const featuredApps = clientState?.clientData?.featuredApps || []
  const { totalCount, pageSize } = clientState?.clientData?.apps || {}
  const [visible, setVisible] = React.useState(false)

  const isDone = installationsFormState === 'DONE'

  React.useEffect(handleInstallationDone({ isDone, installationsSetFormState, fetchAppDetail, appDetail, clientId }), [
    isDone
  ])

  return (
    <ErrorBoundary>
      <div id="page-client-apps-container" className={styles.clientContainer}>
        <AppSidebar />
        {unfetched || loading ? (
          <Loader />
        ) : (
          <div className={styles.clientContent}>
            {!hasParams && featuredApps.length > 0 && (
              <>
                <AppList
                  list={featuredApps}
                  title="Featured Apps"
                  loading={loading}
                  onCardClick={handleOnCardClick({
                    setVisible,
                    setStateViewBrowse,
                    appDetail,
                    fetchAppDetail,
                    clientId
                  })}
                  infoType="CLIENT_APPS_EMPTY"
                  numOfColumn={3}
                />
                <div className={styles.divider} />
              </>
            )}
            <AppList
              list={apps}
              loading={loading}
              onCardClick={handleOnCardClick({ setVisible, setStateViewBrowse, appDetail, fetchAppDetail, clientId })}
              infoType={pageNumber > 1 || hasParams ? '' : 'CLIENT_APPS_EMPTY'}
              pagination={{
                totalCount,
                pageSize,
                pageNumber,
                onChange: handleOnChange(history)
              }}
              numOfColumn={3}
            />
          </div>
        )}
      </div>
      <AppDetailModal visible={visible} afterClose={handleAfterClose({ setVisible })} />
    </ErrorBoundary>
  )
}

export const mapStateToProps = (state: ReduxState): ClientMappedProps => ({
  clientState: state.client,
  appDetail: state.appDetail,
  clientId: selectClientId(state),
  installationsFormState: state.installations.formState
})

export const mapDispatchToProps = (dispatch: any): ClientMappedActions => ({
  setStateViewBrowse: () => dispatch(setAppDetailModalStateBrowse()),
  fetchAppDetail: (id: string, clientId: string) => dispatch(appDetailRequestData({ id, clientId })),
  installationsSetFormState: (formState: FormState) => dispatch(appInstallationsSetFormState(formState))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Client))
