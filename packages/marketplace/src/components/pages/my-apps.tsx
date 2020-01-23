import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { ReduxState, FormState } from '@/types/core'
import { MyAppsState } from '@/reducers/my-apps'
import { Loader } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import routes from '@/constants/routes'
import AppList from '@/components/ui/app-list'
import { appDetailRequestData } from '@/actions/app-detail'
import { AppDetailState } from '@/reducers/app-detail'
import AppDetailModal from '../ui/app-detail-modal'
import { myAppsRequestData } from '@/actions/my-apps'
import { selectClientId } from '@/selector/client'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { handleLaunchApp } from '../../utils/launch-app'
import { appInstallationsSetFormState } from '@/actions/app-installations'
import { setAppDetailModalStateManage } from '@/actions/app-detail-modal'

export interface MyAppsMappedActions {
  setStateViewManage: () => void
  fetchAppDetail: (id: string, clientId: string) => void
  fetchMyApp: (page: number) => void
  installationsSetFormState: (formState: FormState) => void
}

export interface MyAppsMappedProps {
  myAppsState: MyAppsState
  appDetail: AppDetailState
  installationsFormState: FormState
  clientId: string
}

export type MyAppsProps = MyAppsMappedActions & MyAppsMappedProps & RouteComponentProps<{ page?: any }>

export const handleOnChange = history => (page: number) => history.push(`${routes.MY_APPS}/${page}`)

export const handleUseEffect = ({ isDone, installationsSetFormState, fetchMyApp, pageNumber }) => () => {
  if (isDone) {
    installationsSetFormState('PENDING')
    fetchMyApp(pageNumber)
  }
}

export const MyApps: React.FunctionComponent<MyAppsProps> = ({
  myAppsState,
  clientId,
  match,
  fetchMyApp,
  fetchAppDetail,
  appDetail,
  setStateViewManage,
  installationsFormState,
  installationsSetFormState,
  history
}) => {
  const pageNumber = match.params && !isNaN(match.params.page) ? Number(match.params.page) : 1
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
          onChange: handleOnChange(history)
        }}
      />
      <AppDetailModal visible={visible} afterClose={() => setVisible(false)} />
    </ErrorBoundary>
  )
}

export const mapStateToProps = (state: ReduxState): MyAppsMappedProps => ({
  myAppsState: state.myApps,
  appDetail: state.appDetail,
  clientId: selectClientId(state),
  installationsFormState: state.installations.formState
})

export const mapDispatchToProps = (dispatch: any): MyAppsMappedActions => ({
  setStateViewManage: () => dispatch(setAppDetailModalStateManage()),
  fetchAppDetail: (id: string, clientId: string) => dispatch(appDetailRequestData({ id, clientId })),
  fetchMyApp: (page: number) => dispatch(myAppsRequestData(page)),
  installationsSetFormState: (formState: FormState) => dispatch(appInstallationsSetFormState(formState))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MyApps))
