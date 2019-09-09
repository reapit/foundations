import * as React from 'react'
import { connect } from 'react-redux'
import { FormState, ReduxState } from '@/types/core'
import { ScopeModel } from '@/types/marketplace-api-schema'
import bulma from '@/styles/vendor/bulma'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import { Button } from '@reapit/elements'
import { appInstallRequestData, appInstallDone } from '@/actions/app-install'
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
  installDone: () => void
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
  installDone,
  appInstallFormState,
  appName,
  afterClose,
  setAppDetailModalStateView
}: AppConfirmInstallContentInnerProps) => {
  const isLoading = appInstallFormState === 'SUBMITTING'
  const isSuccessed = appInstallFormState === 'SUCCESS'

  if (isSuccessed) {
    installDone()
    return null
  }

  return (
    <div data-test="confirm-content">
      <h3 className={`${bulma.title} ${bulma.is3} ${appPermissionContentStyles.heading}`}>
        Confirm {appName} installation
      </h3>
      {permissions.length ? (
        <>
          <h6 className={appPermissionContentStyles.subtitle}>
            This action will install the app for ALL platform users.
            <br />
            {appName} requires the permissions below. By installing you are granting permission to your data.
          </h6>
          <ul className={appPermissionContentStyles.permissionList}>
            {permissions.map(({ description, name }) => (
              <li key={name} className={appPermissionContentStyles.permissionListItem}>
                {description}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h6 className={appPermissionContentStyles.subtitle}>
          This action will install the app for ALL platform users.
        </h6>
      )}
      <div className={appPermissionContentStyles.installButtonContainer}>
        <Button
          dataTest="agree-btn"
          loading={Boolean(isLoading)}
          className={appPermissionContentStyles.installButton}
          type="button"
          variant="primary"
          onClick={requestInstall}
        >
          Confirm
        </Button>
        <Button
          dataTest="disagree-btn"
          disabled={Boolean(isLoading)}
          className={appPermissionContentStyles.installButton}
          type="button"
          variant="danger"
          onClick={handleCloseModal(setAppDetailModalStateView, afterClose)}
        >
          Cancel
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
  requestInstall: () => dispatch(appInstallRequestData()),
  installDone: () => dispatch(appInstallDone())
})

const AppConfirmInstallContentInnerWithConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppConfirmInstallContent)

AppConfirmInstallContentInnerWithConnect.displayName = 'AppConfirmInstallContentInnerWithConnect'

export default AppConfirmInstallContentInnerWithConnect
