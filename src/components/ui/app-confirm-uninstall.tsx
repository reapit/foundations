import * as React from 'react'
import { connect } from 'react-redux'
import { FormState, ReduxState } from '@/types/core'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import { Button } from '@reapit/elements'
import { appUninstallRequestData, appUninstallDone } from '@/actions/app-uninstall'
import { setAppDetailModalStateView } from '@/actions/app-detail-modal'
import { oc } from 'ts-optchain'

export type AppConfirmUninstallMappedProps = {
  appUninstallFormState: FormState
  appName: string
}

export interface AppConfirmUninstallMappedActions {
  setAppDetailModalStateView: () => void
  requestUninstall: () => void
  uninstallDone: () => void
}

export type AppConfirmUninstallInnerProps = AppConfirmUninstallMappedProps &
  AppConfirmUninstallMappedActions & {
    setAppDetailModalStateView: () => void
    afterClose?: () => void
  }

export const handleCloseModal = (setAppDetailModalStateView: () => void, afterClose?: () => void) => () => {
  if (afterClose) afterClose()
  setAppDetailModalStateView()
}

export const AppConfirmUninstall = ({
  requestUninstall,
  uninstallDone,
  appUninstallFormState,
  appName,
  afterClose,
  setAppDetailModalStateView
}: AppConfirmUninstallInnerProps) => {
  const isLoading = appUninstallFormState === 'SUBMITTING'
  const isSuccessed = appUninstallFormState === 'SUCCESS'

  if (isSuccessed) {
    uninstallDone()
    return null
  }

  return (
    <div data-test="confirm-content">
      <h6 className="mb-5">
        Are you sure you wish to uninstall {appName}? This action will uninstall the app for ALL platform users.
      </h6>
      <div className="flex">
        <Button
          dataTest="agree-btn"
          loading={Boolean(isLoading)}
          className="mx-4"
          fullWidth
          type="button"
          variant="primary"
          onClick={requestUninstall}
        >
          Agree
        </Button>
        <Button
          dataTest="disagree-btn"
          disabled={Boolean(isLoading)}
          className="mx-4"
          fullWidth
          type="button"
          variant="danger"
          onClick={handleCloseModal(setAppDetailModalStateView, afterClose)}
        >
          Disagree
        </Button>
      </div>
    </div>
  )
}

export const mapStateToProps = (state: ReduxState): AppConfirmUninstallMappedProps => ({
  appName: oc(state).appDetail.appDetailData.data.name(''),
  appUninstallFormState: state.appUninstall.formState
})

export const mapDispatchToProps = (dispatch: any): AppConfirmUninstallMappedActions => ({
  setAppDetailModalStateView: () => dispatch(setAppDetailModalStateView()),
  requestUninstall: () => dispatch(appUninstallRequestData()),
  uninstallDone: () => dispatch(appUninstallDone())
})

const AppConfirmUninstallInnerWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppConfirmUninstall)

AppConfirmUninstallInnerWithConnect.displayName = 'AppConfirmUninstallInnerWithConnect'

export default AppConfirmUninstallInnerWithConnect
