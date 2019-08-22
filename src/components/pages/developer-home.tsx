import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { Loader } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { DeveloperState } from '@/reducers/developer'
import { Pagination } from '@reapit/elements'
import routes from '@/constants/routes'
import { oc } from 'ts-optchain'
import AppList from '@/components/ui/app-list'
import { withRouter, RouteComponentProps } from 'react-router'
import { AppDetailState } from '@/reducers/app-detail'
import { appDetailRequestData } from '@/actions/app-detail'
import DeveloperAppModal from '../ui/developer-app-modal'
import bulma from '../../styles/vendor/bulma'
import { setDeveloperAppModalStateViewDetail } from '@/actions/developer-app-modal'
import { appDeleteSetInitFormState } from '@/actions/app-delete'

export interface DeveloperMappedActions {
  fetchAppDetail: (id: string) => void
  setDeveloperAppModalStateViewDetail: () => void
  appDeleteSetInitFormState: () => void
}

export interface DeveloperMappedProps {
  developerState: DeveloperState
  appDetail: AppDetailState
}

export type DeveloperProps = DeveloperMappedActions & DeveloperMappedProps & RouteComponentProps<{ page?: any }>

export const DeveloperHome: React.FunctionComponent<DeveloperProps> = ({
  developerState,
  match,
  fetchAppDetail,
  setDeveloperAppModalStateViewDetail,
  appDeleteSetInitFormState,
  appDetail,
  history
}) => {
  const pageNumber = match.params && !isNaN(match.params.page) ? Number(match.params.page) : 1
  const { title, is3 } = bulma
  const unfetched = !developerState.developerData
  const loading = developerState.loading
  const list = oc<DeveloperState>(developerState).developerData.data.data([])
  const { totalCount, pageSize } = oc<DeveloperState>(developerState).developerData.data({})
  const [visible, setVisible] = React.useState(false)

  if (unfetched && loading) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <AppList
        list={list}
        title="My Apps"
        loading={loading}
        onCardClick={app => {
          setVisible(true)
          setDeveloperAppModalStateViewDetail()
          appDeleteSetInitFormState()
          if (app.id && (!appDetail.appDetailData || appDetail.appDetailData.data.id !== app.id)) {
            fetchAppDetail(app.id)
          }
        }}
      />
      <Pagination
        onChange={page => history.push(`${routes.DEVELOPER_MY_APPS}/${page}`)}
        totalCount={totalCount}
        pageSize={pageSize}
        pageNumber={pageNumber}
      />
      <DeveloperAppModal visible={visible} afterClose={() => setVisible(false)} />
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): DeveloperMappedProps => ({
  developerState: state.developer,
  appDetail: state.appDetail
})

const mapDispatchToProps = (dispatch: any): DeveloperMappedActions => ({
  fetchAppDetail: (id: string) => dispatch(appDetailRequestData({ id })),
  setDeveloperAppModalStateViewDetail: () => dispatch(setDeveloperAppModalStateViewDetail()),
  appDeleteSetInitFormState: () => dispatch(appDeleteSetInitFormState())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DeveloperHome)
)
