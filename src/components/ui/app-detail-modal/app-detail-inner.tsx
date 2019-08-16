import * as React from 'react'
import { connect } from 'react-redux'
import { AppDetailModalState } from '@/reducers/app-detail-modal'
import { ReduxState } from '@/types/core'
import AppDetail from '@/components/ui/app-detail'
import { AppDetailState } from '@/reducers/app-detail'
import AppPermission from '@/components/ui/app-permission'
import AppInstallConfirm from '@/components/ui/app-confirm-install'

export interface AppDetailInnerMappedProps {
  appDetailModalState: AppDetailModalState
  appDetailState: AppDetailState
}

export const mapStateToProps = (state: ReduxState): AppDetailInnerMappedProps => ({
  appDetailModalState: state.appDetailModal,
  appDetailState: state.appDetail
})

type AppDetailInnerProps = AppDetailInnerMappedProps & {
  afterClose?: () => void
}

export const AppDetailInner: React.FunctionComponent<AppDetailInnerProps> = ({
  appDetailModalState,
  appDetailState,
  afterClose
}) => {
  if (appDetailModalState === 'VIEW_DETAIL') {
    if (!appDetailState.appDetailData || !appDetailState.appDetailData.data) {
      return null
    }
    return <AppDetail data={appDetailState.appDetailData.data} />
  }

  if (appDetailModalState === 'VIEW_PERMISSION') {
    return <AppPermission afterClose={afterClose} />
  }

  if (appDetailModalState === 'VIEW_CONFIRM_INSTALL') {
    return <AppInstallConfirm afterClose={afterClose} />
  }

  return null
}

const AppDetailInnerWithConnect = connect(
  mapStateToProps,
  null
)(AppDetailInner)

export default AppDetailInnerWithConnect
