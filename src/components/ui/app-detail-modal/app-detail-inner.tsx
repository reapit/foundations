import * as React from 'react'
import { connect } from 'react-redux'
import { AppDetailModalState } from '@/reducers/app-detail-modal'
import { ReduxState } from '@/types/core'
import AppDetail from '@/components/ui/app-detail'
import { AppDetailState } from '@/reducers/app-detail'
import AppPermission from '@/components/ui/app-permission/app-permission'
import AppInstallConfirm from '@/components/ui/app-confirm-install/app-confirm-install'
import AppUninstallConfirm from '@/components/ui/app-confirm-uninstall'
import CallToAction from '../call-to-action'
import { handleCloseModal, mapDispatchToProps } from '../app-confirm-install/app-confirm-install'

export interface AppDetailInnerMappedProps {
  appDetailModalState: AppDetailModalState
  appDetailState: AppDetailState
}

export interface AppDetailInnerMappedActions {
  setAppDetailModalStateView: () => void
}

export const mapStateToProps = (state: ReduxState): AppDetailInnerMappedProps => ({
  appDetailModalState: state.appDetailModal,
  appDetailState: state.appDetail
})

export type AppDetailInnerProps = AppDetailInnerMappedProps &
  AppDetailInnerMappedActions & {
    afterClose?: () => void
  }

export const AppDetailInner: React.FunctionComponent<AppDetailInnerProps> = ({
  appDetailModalState,
  appDetailState,
  afterClose,
  setAppDetailModalStateView
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

  if (appDetailModalState === 'VIEW_CONFIRM_UNINSTALL') {
    return <AppUninstallConfirm afterClose={afterClose} />
  }

  if (appDetailModalState === 'VIEW_DETAIL_ACTION_SUCCESS') {
    return (
      <CallToAction
        title="Success!"
        buttonText="Back to List"
        dataTest="alertInstalledSuccess"
        onButtonClick={handleCloseModal(setAppDetailModalStateView, afterClose)}
        isCenter
      >
        App has been successfully installed.
      </CallToAction>
    )
  }

  return null
}

const AppDetailInnerWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppDetailInner)

export default AppDetailInnerWithConnect
