import * as React from 'react'
import { connect } from 'react-redux'
import { AppDetailModalState } from '@/reducers/app-detail-modal'
import { ReduxState, FormState } from '@/types/core'
import AppDetail from '@/components/ui/app-detail'
import { AppDetailState } from '@/reducers/app-detail'
import AppInstallConfirm from '@/components/ui/app-confirm-install'
import AppUninstallConfirm from '@/components/ui/app-confirm-uninstall'
import CallToAction from '../call-to-action'
import { ModalBody } from '@reapit/elements'
import { setAppDetailModalStateView } from '@/actions/app-detail-modal'
import { appInstallationsSetFormState } from '@/actions/app-installations'

export interface AppDetailInnerMappedProps {
  appDetailModalState: AppDetailModalState
  appDetailState: AppDetailState
}

export interface AppDetailInnerMappedActions {
  setAppDetailModalStateView: () => void
  installationsSetFormState: (formState: FormState) => void
}

export const mapStateToProps = (state: ReduxState): AppDetailInnerMappedProps => ({
  appDetailModalState: state.appDetailModal,
  appDetailState: state.appDetail
})

export const mapDispatchToProps = (dispatch: any): AppDetailInnerMappedActions => ({
  setAppDetailModalStateView: () => dispatch(setAppDetailModalStateView()),
  installationsSetFormState: (formState: FormState) => dispatch(appInstallationsSetFormState(formState))
})

export type AppDetailInnerProps = AppDetailInnerMappedProps &
  AppDetailInnerMappedActions & {
    afterClose?: () => void
  }

export const handleCloseModal = (
  setAppDetailModalStateView: () => void,
  afterClose?: () => void,
  installationsSetFormState?: (formState: FormState) => void
) => () => {
  afterClose && afterClose()
  installationsSetFormState && installationsSetFormState('DONE')
  setAppDetailModalStateView()
}

export const AppDetailInner: React.FunctionComponent<AppDetailInnerProps> = ({
  appDetailModalState,
  appDetailState,
  afterClose,
  setAppDetailModalStateView,
  installationsSetFormState
}) => {
  if (appDetailModalState === 'VIEW_DETAIL') {
    if (!appDetailState.appDetailData || !appDetailState.appDetailData.data) {
      return null
    }
    return <AppDetail data={appDetailState.appDetailData.data} afterClose={afterClose as () => void} />
  }

  if (appDetailModalState === 'VIEW_CONFIRM_INSTALL') {
    return <AppInstallConfirm afterClose={afterClose} />
  }

  if (appDetailModalState === 'VIEW_CONFIRM_UNINSTALL') {
    return <AppUninstallConfirm afterClose={afterClose} />
  }

  if (appDetailModalState === 'VIEW_DETAIL_ACTION_SUCCESS') {
    const appName = appDetailState?.appDetailData?.data?.name || 'App'
    const isInstalled = !!appDetailState?.appDetailData?.data?.installationId
    return (
      <ModalBody
        body={
          <CallToAction
            title="Success!"
            buttonText="Back to List"
            dataTest="alertInstalledSuccess"
            onButtonClick={handleCloseModal(setAppDetailModalStateView, afterClose, installationsSetFormState)}
            isCenter
          >
            {appName} has been successfully {isInstalled ? 'installed' : 'uninstalled'}
          </CallToAction>
        }
      />
    )
  }

  return null
}

const AppDetailInnerWithConnect = connect(mapStateToProps, mapDispatchToProps)(AppDetailInner)

export default AppDetailInnerWithConnect
