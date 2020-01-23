import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { Loader } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { DeveloperState } from '@/reducers/developer'
import routes from '@/constants/routes'
import AppList from '@/components/ui/app-list'
import { withRouter, RouteComponentProps } from 'react-router'
import { AppDetailState } from '@/reducers/app-detail'
import { appDetailRequestData, removeAuthenticationCode } from '@/actions/app-detail'
import DeveloperAppModal from '../ui/developer-app-modal'
import { setDeveloperAppModalStateViewDetail, developerAppShowModal } from '@/actions/developer-app-modal'
import { appDeleteSetInitFormState } from '@/actions/app-delete'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import { SandboxPopUp } from '../ui/sandbox-pop-up'

export interface DeveloperMappedActions {
  fetchAppDetail: (id: string) => void
  setDeveloperAppModalStateViewDetail: () => void
  appDeleteSetInitFormState: () => void
  setVisible: (isVisible: boolean) => void
  removeAuthenticationCode: () => void
}

export interface DeveloperMappedProps {
  developerState: DeveloperState
  appDetail: AppDetailState
  isVisible: boolean
}

export const handleOnCardClick = ({
  setVisible,
  appDetail,
  fetchAppDetail,
  setDeveloperAppModalStateViewDetail,
  appDeleteSetInitFormState
}) => (app: AppSummaryModel) => {
  setVisible(true)
  setDeveloperAppModalStateViewDetail()
  appDeleteSetInitFormState()
  if (app.id && (!appDetail.appDetailData || appDetail.appDetailData.data.id !== app.id)) {
    fetchAppDetail(app.id)
  }
}

export const handleAfterClose = ({ setVisible, removeAuthenticationCode }) => () => {
  removeAuthenticationCode()
  setVisible(false)
}

export const handleOnChange = history => (page: number) => history.push(`${routes.DEVELOPER_MY_APPS}/${page}`)

export type DeveloperProps = DeveloperMappedActions & DeveloperMappedProps & RouteComponentProps<{ page?: any }>

export const DeveloperHome: React.FunctionComponent<DeveloperProps> = ({
  developerState,
  match,
  fetchAppDetail,
  setDeveloperAppModalStateViewDetail,
  appDeleteSetInitFormState,
  appDetail,
  history,
  isVisible,
  setVisible,
  removeAuthenticationCode
}) => {
  const pageNumber = match.params && !isNaN(match.params.page) ? Number(match.params.page) : 1
  const unfetched = !developerState.developerData
  const loading = developerState.loading
  const list = developerState?.developerData?.data?.data || []
  const { totalCount, pageSize } = developerState?.developerData?.data || {}

  if (unfetched || loading) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <div id="page-developer-home-container">
        <AppList
          list={list}
          title="My Apps"
          loading={loading}
          onCardClick={handleOnCardClick({
            setVisible,
            appDetail,
            fetchAppDetail,
            setDeveloperAppModalStateViewDetail,
            appDeleteSetInitFormState
          })}
          infoType="DEVELOPER_APPS_EMPTY"
          pagination={{
            totalCount,
            pageSize,
            pageNumber,
            onChange: handleOnChange(history)
          }}
        />
        <SandboxPopUp loading={loading} />
        <DeveloperAppModal
          visible={isVisible}
          afterClose={handleAfterClose({ setVisible, removeAuthenticationCode })}
        />
      </div>
    </ErrorBoundary>
  )
}

export const mapStateToProps = (state: ReduxState): DeveloperMappedProps => ({
  developerState: state.developer,
  appDetail: state.appDetail,
  isVisible: state.developer.isVisible
})

export const mapDispatchToProps = (dispatch: any): DeveloperMappedActions => ({
  fetchAppDetail: (id: string) => dispatch(appDetailRequestData({ id })),
  setDeveloperAppModalStateViewDetail: () => dispatch(setDeveloperAppModalStateViewDetail()),
  appDeleteSetInitFormState: () => dispatch(appDeleteSetInitFormState()),
  setVisible: (isVisible: boolean) => dispatch(developerAppShowModal(isVisible)),
  removeAuthenticationCode: () => dispatch(removeAuthenticationCode())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeveloperHome))
