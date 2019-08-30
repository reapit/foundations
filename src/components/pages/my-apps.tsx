import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { ReduxState, FormState } from '@/types/core'
import { MyAppsState } from '@/reducers/my-apps'
import { Loader, Pagination } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import routes from '@/constants/routes'
import { oc } from 'ts-optchain'
import AppList from '@/components/ui/app-list'
import { appDetailRequestData } from '@/actions/app-detail'
import { AppDetailState } from '@/reducers/app-detail'
import AppDetailModal from '../ui/app-detail-modal'
import { myAppsRequestData } from '@/actions/my-apps'
import { appUninstallDone } from '@/actions/app-uninstall'
import { selectClientId } from '@/selector/client'

export interface MyAppsMappedActions {
  fetchAppDetail: (id: string, clientId: string) => void
  fetchMyApp: (page: number) => void
  appUninstallDone: () => void
}

export interface MyAppsMappedProps {
  myAppsState: MyAppsState
  appDetail: AppDetailState
  appUninstallFormState: FormState
  clientId: string
}

export type MyAppsProps = MyAppsMappedActions & MyAppsMappedProps & RouteComponentProps<{ page?: any }>

export const MyApps: React.FunctionComponent<MyAppsProps> = ({
  myAppsState,
  clientId,
  match,
  fetchMyApp,
  fetchAppDetail,
  appDetail,
  appUninstallDone,
  appUninstallFormState,
  history
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
            fetchAppDetail(app.id, clientId)
          }
        }}
      />
      <Pagination
        onChange={page => history.push(`${routes.MY_APPS}/${page}`)}
        totalCount={totalCount}
        pageSize={pageSize}
        pageNumber={pageNumber}
      />
      <AppDetailModal visible={visible} afterClose={() => setVisible(false)} />
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): MyAppsMappedProps => ({
  myAppsState: state.myApps,
  appDetail: state.appDetail,
  clientId: selectClientId(state),
  appUninstallFormState: state.appUninstall.formState
})

const mapDispatchToProps = (dispatch: any): MyAppsMappedActions => ({
  fetchAppDetail: (id: string, clientId: string) => dispatch(appDetailRequestData({ id, clientId })),
  fetchMyApp: (page: number) => dispatch(myAppsRequestData(page)),
  appUninstallDone: () => dispatch(appUninstallDone())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyApps)
)
