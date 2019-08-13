import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { ReduxState, FormState } from '@/types/core'
import { MyAppsState } from '@/reducers/my-apps'
import Loader from '@/components/ui/loader'
import ErrorBoundary from '@/components/hocs/error-boundary'
import Pagination from '@/components/ui/pagination'
import routes from '@/constants/routes'
import { oc } from 'ts-optchain'
import AppList from '@/components/ui/app-list'
import { appDetailRequestData } from '@/actions/app-detail'
import { AppDetailState } from '@/reducers/app-detail'
import AppDetailModal from '../ui/app-detail-modal'
import { myAppsRequestData } from '@/actions/my-apps'
import { appUninstallDone } from '@/actions/app-uninstall'

export interface MyAppsMappedActions {
  fetchAppDetail: (id: string) => void
  fetchMyApp: (page: number) => void
  appUninstallDone: () => void
}

export interface MyAppsMappedProps {
  myAppsState: MyAppsState
  appDetail: AppDetailState
  appUninstallFormState: FormState
}

export type MyAppsProps = MyAppsMappedActions & MyAppsMappedProps & RouteComponentProps<{ page?: any }>

export const MyApps: React.FunctionComponent<MyAppsProps> = ({
  myAppsState,
  match,
  fetchMyApp,
  fetchAppDetail,
  appDetail,
  appUninstallDone,
  appUninstallFormState
}) => {
  const pageNumber = match.params && !isNaN(match.params.page) ? Number(match.params.page) : 1
  const unfetched = !myAppsState.myAppsData
  const loading = myAppsState.loading
  const list = oc<MyAppsState>(myAppsState).myAppsData.data.data([])
  const { totalCount, pageSize } = oc<MyAppsState>(myAppsState).myAppsData.data({})
  const [visible, setVisible] = React.useState(false)
  const isSuccessed = appUninstallFormState === 'SUCCESS'

  React.useEffect(() => {
    if (isSuccessed) {
      setVisible(false)
      appUninstallDone()
      fetchMyApp(pageNumber)
    }
  }, [isSuccessed])

  if (unfetched && loading) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <AppList
        list={list}
        title="Installed Apps"
        loading={loading}
        onCardClick={app => {
          setVisible(true)
          if (app.id && (!appDetail.appDetailData || appDetail.appDetailData.data.id !== app.id)) {
            fetchAppDetail(app.id)
          }
        }}
      />
      <Pagination baseUrl={routes.MY_APPS} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
      <AppDetailModal visible={visible} afterClose={() => setVisible(false)} />
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): MyAppsMappedProps => ({
  myAppsState: state.myApps,
  appDetail: state.appDetail,
  appUninstallFormState: state.appUninstall.formState
})

const mapDispatchToProps = (dispatch: any): MyAppsMappedActions => ({
  fetchAppDetail: (id: string) => dispatch(appDetailRequestData(id)),
  fetchMyApp: (page: number) => dispatch(myAppsRequestData(page)),
  appUninstallDone: () => dispatch(appUninstallDone())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyApps)
)
