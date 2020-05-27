import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router'
import { FormState } from '@/types/core'
import { Loader, Info } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import routes from '@/constants/routes'
import AppList from '@/components/ui/app-list'
import { appDetailRequestData } from '@/actions/app-detail'
import AppDetailModal from '@/components/ui/app-detail-modal'
import { myAppsRequestData } from '@/actions/my-apps'
import { selectClientId, selectMyApps, selectAppDetail } from '@/selector/client'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { handleLaunchApp } from '@/utils/launch-app'
import { appInstallationsSetFormState } from '@/actions/app-installations'
import { setAppDetailModalStateManage } from '@/actions/app-detail-modal'
import { selectIsAdmin } from '@/selector/auth'
import { selectInstallationFormState } from '@/selector/installations'
import { Dispatch } from 'redux'

export const handleOnChange = history => (page: number) => history.push(`${routes.MY_APPS}/${page}`)

export const handleUseEffect = ({ isDone, installationsSetFormState, fetchMyApp, pageNumber }) => () => {
  if (isDone) {
    installationsSetFormState('PENDING')
    fetchMyApp(pageNumber)
  }
}

export const handleFetchMyApp = (dispatch: Dispatch, page: number) => () => {
  dispatch(myAppsRequestData(page))
}

export const handleSetStateViewManage = (dispatch: Dispatch) => () => {
  dispatch(setAppDetailModalStateManage())
}

export const handleFetchAppDetail = (dispatch: Dispatch) => (id: string, clientId: string) => {
  dispatch(appDetailRequestData({ id, clientId }))
}

export const handleInstallationsSetFormState = (dispatch: Dispatch) => (formState: FormState) => {
  dispatch(appInstallationsSetFormState(formState))
}

export const MyApps: React.FunctionComponent = () => {
  const dispatch = useDispatch()

  const myAppsState = useSelector(selectMyApps)
  const appDetail = useSelector(selectAppDetail)
  const clientId = useSelector(selectClientId)
  const installationsFormState = useSelector(selectInstallationFormState)
  const isAdmin = useSelector(selectIsAdmin)
  const history = useHistory()
  const { page = 1 } = useParams()
  const pageNumber = Number(page)

  const fetchMyApp = handleFetchMyApp(dispatch, pageNumber)
  const setStateViewManage = handleSetStateViewManage(dispatch)
  const fetchAppDetail = handleFetchAppDetail(dispatch)
  const installationsSetFormState = handleInstallationsSetFormState(dispatch)

  const unfetched = !myAppsState.myAppsData
  const loading = myAppsState.loading
  const list = myAppsState?.myAppsData?.data?.data || []
  const { totalCount, pageSize } = myAppsState?.myAppsData?.data || {}
  const [visible, setVisible] = React.useState(false)
  const isDone = installationsFormState === 'DONE'

  React.useEffect(handleUseEffect({ isDone, installationsSetFormState, fetchMyApp, pageNumber }), [isDone])

  if (unfetched || loading) {
    return <Loader />
  }
  if (!isAdmin) return <Info infoType="404" />

  return (
    <ErrorBoundary>
      <AppList
        list={list}
        title="Manage Apps"
        loading={loading}
        onCardClick={(app: AppSummaryModel) => handleLaunchApp(app)}
        onSettingsClick={(app: AppSummaryModel) => {
          setVisible(true)
          setStateViewManage()
          if (app.id && (!appDetail.appDetailData || appDetail.appDetailData.data.id !== app.id)) {
            fetchAppDetail(app.id, clientId)
          }
        }}
        infoType="INSTALLED_APPS_EMPTY"
        pagination={{
          totalCount,
          pageSize,
          pageNumber,
          onChange: handleOnChange(history),
        }}
      />
      <AppDetailModal visible={visible} afterClose={() => setVisible(false)} />
    </ErrorBoundary>
  )
}

export default MyApps
