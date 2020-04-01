import * as React from 'react'
import { connect } from 'react-redux'
import { AppDetailModalState } from '@/reducers/app-detail-modal'
import { ReduxState, FormState } from '@/types/core'
import AppDetail from '@/components/ui/app-detail'
import AppInstallConfirm from '@/components/ui/app-confirm-install'
import AppUninstallConfirm from '@/components/ui/app-confirm-uninstall'
import CallToAction from '../call-to-action'
import { Button } from '@reapit/elements'
import {
  setAppDetailModalStateBrowse,
  setAppDetailModalStateUninstall,
  setAppDetailModalStateInstall,
} from '@/actions/app-detail-modal'
import { appInstallationsSetFormState } from '@/actions/app-installations'
import { AppDetailModel } from '@/types/marketplace-api-schema'
import styles from '@/styles/blocks/app-detail.scss?mod'
import { FaCheck } from 'react-icons/fa'
import { LoginMode } from '@reapit/cognito-auth'
import { DESKTOP_REFRESH_URL } from '@/constants/desktop-urls'

export interface AppDetailInnerMappedProps {
  appDetailModalState: AppDetailModalState
  appDetailData: AppDetailModel
  loginMode: LoginMode
}

export interface AppDetailInnerMappedActions {
  setStateViewBrowse: () => void
  setStateViewInstall: () => void
  setStateViewUninstall: () => void
  installationsSetFormState: (formState: FormState) => void
}

export const mapStateToProps = (state: ReduxState): AppDetailInnerMappedProps => ({
  appDetailModalState: state.appDetailModal,
  appDetailData: state.appDetail.appDetailData?.data!,
  loginMode: state.auth.refreshSession?.mode || 'WEB',
})

export const mapDispatchToProps = (dispatch: any): AppDetailInnerMappedActions => ({
  setStateViewBrowse: () => dispatch(setAppDetailModalStateBrowse()),
  setStateViewInstall: () => dispatch(setAppDetailModalStateInstall()),
  setStateViewUninstall: () => dispatch(setAppDetailModalStateUninstall()),
  installationsSetFormState: (formState: FormState) => dispatch(appInstallationsSetFormState(formState)),
})

export type AppDetailInnerProps = AppDetailInnerMappedProps &
  AppDetailInnerMappedActions & {
    afterClose?: () => void
  }

export const handleCloseModal = (
  setAppDetailModalStateBrowse: () => void,
  loginMode: LoginMode,
  installationsSetFormState: (formState: FormState) => void,
  afterClose?: () => void,
) => () => {
  if (loginMode === 'DESKTOP') {
    window.location.href = DESKTOP_REFRESH_URL
  }

  afterClose && afterClose()
  installationsSetFormState('DONE')
  setAppDetailModalStateBrowse()
}

export const renderFooterAppDetailBrowse = ({ appDetailData, setStateViewInstall }) => {
  return appDetailData.installedOn ? (
    <div data-test="detail-modal-installed" className={styles.installed}>
      <FaCheck />
      <span>Installed</span>
    </div>
  ) : (
    <Button dataTest="detail-modal-install-button" type="button" variant="primary" onClick={setStateViewInstall}>
      Install App
    </Button>
  )
}

export const renderFooterAppDetailManage = ({ setStateViewUninstall }) => {
  return (
    <Button dataTest="detail-modal-uninstall-button" type="button" variant="primary" onClick={setStateViewUninstall}>
      Uninstall App
    </Button>
  )
}

export const AppDetailInner: React.FunctionComponent<AppDetailInnerProps> = ({
  appDetailModalState,
  appDetailData,
  afterClose,
  setStateViewBrowse,
  setStateViewInstall,
  setStateViewUninstall,
  installationsSetFormState,
  loginMode,
}) => {
  if (appDetailModalState === 'VIEW_DETAIL_BROWSE') {
    return (
      <AppDetail
        data={appDetailData}
        afterClose={afterClose}
        footerItems={renderFooterAppDetailBrowse({ appDetailData, setStateViewInstall })}
      />
    )
  }

  if (appDetailModalState === 'VIEW_DETAIL_MANAGE') {
    return (
      <AppDetail
        data={appDetailData}
        afterClose={afterClose}
        footerItems={renderFooterAppDetailManage({ setStateViewUninstall })}
      />
    )
  }

  if (appDetailModalState === 'VIEW_CONFIRM_INSTALL') {
    return <AppInstallConfirm afterClose={afterClose} />
  }

  if (appDetailModalState === 'VIEW_CONFIRM_UNINSTALL') {
    return <AppUninstallConfirm afterClose={afterClose} />
  }

  if (appDetailModalState === 'VIEW_DETAIL_ACTION_SUCCESS') {
    const appName = appDetailData.name || 'App'
    const isInstalled = !!appDetailData.installationId
    return (
      <CallToAction
        title="Success"
        buttonText="Back to List"
        dataTest="installations-success-message"
        buttonDataTest="installations-success-button"
        onButtonClick={handleCloseModal(setStateViewBrowse, loginMode, installationsSetFormState, afterClose)}
        isCenter
      >
        {appName} has been successfully {isInstalled ? 'uninstalled' : 'installed'}
      </CallToAction>
    )
  }

  return null
}

const AppDetailInnerWithConnect = connect(mapStateToProps, mapDispatchToProps)(AppDetailInner)

export default AppDetailInnerWithConnect
