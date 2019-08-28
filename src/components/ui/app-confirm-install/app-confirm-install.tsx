import * as React from 'react'
import { connect } from 'react-redux'
import { FormState, ReduxState } from '@/types/core'
import { ScopeModel } from '@/types/marketplace-api-schema'
import bulma from '@/styles/vendor/bulma'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import { Button } from '@reapit/elements'
import { appInstallRequestData } from '@/actions/app-install'
import { setAppDetailModalStateView } from '@/actions/app-detail-modal'
import { oc } from 'ts-optchain'

export type AppConfirmInstallContentMappedProps = {
  permissions: ScopeModel[]
  appInstallFormState: FormState
  appName: string
}

export interface AppConfirmInstallContentMappedActions {
  setAppDetailModalStateView: () => void
  requestInstall: () => void
}

export type AppConfirmInstallContentInnerProps = AppConfirmInstallContentMappedProps &
  AppConfirmInstallContentMappedActions & {
    setAppDetailModalStateView: () => void
    afterClose?: () => void
  }

export const handleCloseModal = (setAppDetailModalStateView: () => void, afterClose?: () => void) => () => {
  if (afterClose) afterClose()
  setAppDetailModalStateView()
}

export const AppConfirmInstallContent = ({
  permissions,
  requestInstall,
  appInstallFormState,
  appName,
  afterClose,
  setAppDetailModalStateView
}: AppConfirmInstallContentInnerProps) => {
  const isLoading = appInstallFormState === 'SUBMITTING'
  const isSuccessed = appInstallFormState === 'SUCCESS'

  if (isSuccessed) {
    return null
  }

  return (
    <div data-test="confirm-content">
      <h3 className={`${bulma.title} ${bulma.is3} ${appPermissionContentStyles.heading}`}>
        Please confim you agree to the permissions before installing
      </h3>
      <h6 className={appPermissionContentStyles.subtitle}>
        This {appName} equires the following permissions, please click ‘Agree’ to continue to the installation.
      </h6>
      <ul className={appPermissionContentStyles.permissionList}>
        {permissions.map(({ description, name }) => (
          <li key={name} className={appPermissionContentStyles.permissionListItem}>
            {description}
          </li>
        ))}
      </ul>
      <div className={appPermissionContentStyles.installButtonContainer}>
        <Button
          dataTest="agree-btn"
          loading={Boolean(isLoading)}
          className={appPermissionContentStyles.installButton}
          type="button"
          variant="primary"
          onClick={requestInstall}
        >
          Agree
        </Button>
        <Button
          dataTest="disagree-btn"
          disabled={Boolean(isLoading)}
          className={appPermissionContentStyles.installButton}
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

export const mapStateToProps = (state: ReduxState): AppConfirmInstallContentMappedProps => ({
  permissions: oc(state).appDetail.appDetailData.data.scopes([]),
  appName: oc(state).appDetail.appDetailData.data.name(''),
  appInstallFormState: state.appInstall.formState
})

export const mapDispatchToProps = (dispatch: any): AppConfirmInstallContentMappedActions => ({
  setAppDetailModalStateView: () => dispatch(setAppDetailModalStateView()),
  requestInstall: () => dispatch(appInstallRequestData())
})

const AppConfirmInstallContentInnerWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppConfirmInstallContent)

AppConfirmInstallContentInnerWithConnect.displayName = 'AppConfirmInstallContentInnerWithConnect'

export default AppConfirmInstallContentInnerWithConnect
