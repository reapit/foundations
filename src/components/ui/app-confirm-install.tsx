import * as React from 'react'
import { connect } from 'react-redux'
import { FormState, ReduxState } from '@/types/core'
import { ScopeModel } from '@/types/marketplace-api-schema'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import { Button, H3, SubTitleH6, ModalHeader, ModalBody, ModalFooter } from '@reapit/elements'
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
    <>
      <ModalHeader
        title={`Confirm ${appName} installation`}
        afterClose={afterClose as () => void}
        data-test="confirm-content"
      />
      <ModalBody
        body={
          permissions.length ? (
            <>
              <SubTitleH6 isCentered>
                This action will install the app for ALL platform users.
                <br />
                {appName} requires the permissions below. By installing you are granting permission to your data.
              </SubTitleH6>
              <ul className={appPermissionContentStyles.permissionList}>
                {permissions.map(({ description, name }) => (
                  <li key={name} className={appPermissionContentStyles.permissionListItem}>
                    {description}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <SubTitleH6 isCentered>This action will install the app for ALL platform users.</SubTitleH6>
          )
        }
      />
      <ModalFooter
        footerItems={
          <>
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
          </>
        }
      />
    </>
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
