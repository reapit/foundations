import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FormState } from '@/types/core'
import { Loader } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { useHistory, useLocation } from 'react-router'
import AppList from '@/components/ui/app-list'
import AppSidebar from '@/components/ui/app-sidebar'
import { appDetailRequestData } from '@/actions/app-detail'
import { AppDetailState } from '@/reducers/app-detail'
import AppDetailModal from '@/components/ui/app-detail-modal'
import { selectClientId, selectAppSummary } from '@/selector/client'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/pages/client.scss?mod'
import { appInstallationsSetFormState } from '@/actions/app-installations'
import { addQuery, hasFilterParams } from '@/utils/client-url-params'
import { setAppDetailModalStateBrowse } from '@/actions/app-detail-modal'
import { selectAppDetail } from '@/selector/client'
import { selectInstallationFormState } from '@/selector/installations'
import { Dispatch } from 'redux'

export const handleAfterClose = ({ setVisible }) => () => setVisible(false)
export const handleOnChange = history => (page: number) => {
  history.push(addQuery({ page }))
}

export interface onCardClickParams {
  setVisible: (isVisible: boolean) => void
  setStateViewBrowse: () => void
  appDetail: AppDetailState
  fetchAppDetail: (id: string, client: string) => void
  clientId: string
}

export const handleOnCardClick = ({
  setVisible,
  setStateViewBrowse,
  appDetail,
  fetchAppDetail,
  clientId,
}: onCardClickParams) => (app: AppSummaryModel) => {
  setVisible(true)
  setStateViewBrowse()
  const isCacheEmpty = !appDetail.appDetailData
  const isCacheStale = appDetail.isStale
  const currentAppIdNotMatchWithCachedAppId = appDetail.appDetailData?.data?.id !== app.id

  if (app.id && (isCacheEmpty || isCacheStale || currentAppIdNotMatchWithCachedAppId)) {
    fetchAppDetail(app.id, clientId)
  }
}

export const handleInstallationDone = ({
  isDone,
  installationsSetFormState,
  fetchAppDetail,
  appDetail,
  clientId,
}) => () => {
  if (isDone) {
    installationsSetFormState('PENDING')
    fetchAppDetail(appDetail.appDetailData.data.id, clientId)
  }
}

export const handleSetStateViewBrowse = (dispatch: Dispatch) => () => {
  dispatch(setAppDetailModalStateBrowse())
}

export const handleFetchAppDetail = (dispatch: Dispatch) => (id, clientId) => {
  dispatch(appDetailRequestData({ id, clientId }))
}

export const handleInstallationsSetFormState = (dispatch: Dispatch) => (formState: FormState) => {
  dispatch(appInstallationsSetFormState(formState))
}

export const Client: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const appSummaryState = useSelector(selectAppSummary)
  const appDetail = useSelector(selectAppDetail)
  const clientId = useSelector(selectClientId)
  const installationsFormState = useSelector(selectInstallationFormState)

  const setStateViewBrowse = handleSetStateViewBrowse(dispatch)
  const fetchAppDetail = handleFetchAppDetail(dispatch)
  const installationsSetFormState = handleInstallationsSetFormState(dispatch)

  const urlParams = new URLSearchParams(location.search)
  const pageNumber = Number(urlParams.get('page')) || 1

  const hasParams = hasFilterParams(location.search)
  const unfetched = !appSummaryState.data
  const loading = appSummaryState.isAppSummaryLoading
  const apps = appSummaryState?.data?.apps?.data || []
  const featuredApps = appSummaryState?.data?.featuredApps || []
  const { totalCount, pageSize } = appSummaryState?.data?.apps || {}
  const [visible, setVisible] = React.useState(false)

  const isDone = installationsFormState === 'DONE'

  React.useEffect(handleInstallationDone({ isDone, installationsSetFormState, fetchAppDetail, appDetail, clientId }), [
    isDone,
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
                    clientId,
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
                onChange: handleOnChange(history),
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

export default Client
