import * as React from 'react'
import { connect } from 'react-redux'
import { FormState, ReduxState } from '@/types/core'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import { Button, SubTitleH6, ModalHeader, ModalBody, ModalFooter } from '@reapit/elements'
import { setAppDetailModalStateBrowse, setAppDetailModalStateSuccess } from '@/actions/app-detail-modal'
import { InstallParams, appInstallationsRequestInstall } from '@/actions/app-installations'

export type AppConfirmInstallContentMappedProps = {
  installationsFormState: FormState
  appDetailData?: AppDetailModel
}

export interface AppConfirmInstallContentMappedActions {
  setAppDetailModalStateBrowse: () => void
  setAppDetailModalStateSuccess: () => void
  installApp: (params: InstallParams) => () => void
}

export type AppConfirmInstallContentInnerProps = AppConfirmInstallContentMappedProps &
  AppConfirmInstallContentMappedActions & {
    afterClose?: () => void
  }

export const handleCloseModal = (setAppDetailModalStateBrowse: () => void, afterClose?: () => void) => () => {
  if (afterClose) afterClose()
  setAppDetailModalStateBrowse()
}

export const handleInstallSuccess = ({ isSuccessed, setAppDetailModalStateSuccess }) => () => {
  if (isSuccessed) {
    setAppDetailModalStateSuccess()
  }
}

export const AppConfirmInstallContent = ({
  installApp,
  installationsFormState,
  appDetailData,
  afterClose,
  setAppDetailModalStateBrowse,
  setAppDetailModalStateSuccess
}: AppConfirmInstallContentInnerProps) => {
  const isLoading = installationsFormState === 'SUBMITTING'
  const isSuccessed = installationsFormState === 'SUCCESS'

  const { name, id, scopes = [] } = appDetailData || {}

  React.useEffect(handleInstallSuccess({ isSuccessed, setAppDetailModalStateSuccess }), [isSuccessed])

  return (
    <>
      <ModalHeader
        title={`Confirm ${name} installation`}
        afterClose={afterClose as () => void}
        data-test="confirm-content"
      />
      <ModalBody
        body={
          scopes.length ? (
            <>
              <SubTitleH6 isCentered>
                This action will install the app for ALL platform users.
                <br />
                {name} requires the permissions below. By installing you are granting permission to your data.
              </SubTitleH6>
              <ul className={appPermissionContentStyles.permissionList}>
                {scopes.map(({ description, name }) => (
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
              onClick={installApp({ appId: id })}
            >
              Confirm
            </Button>
            <Button
              dataTest="disagree-btn"
              disabled={Boolean(isLoading)}
              className={appPermissionContentStyles.installButton}
              type="button"
              variant="danger"
              onClick={handleCloseModal(setAppDetailModalStateBrowse, afterClose)}
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
  appDetailData: state?.appDetail?.appDetailData?.data,
  installationsFormState: state.installations.formState
})

export const mapDispatchToProps = (dispatch: any): AppConfirmInstallContentMappedActions => ({
  setAppDetailModalStateBrowse: () => dispatch(setAppDetailModalStateBrowse()),
  setAppDetailModalStateSuccess: () => dispatch(setAppDetailModalStateSuccess()),
  installApp: (params: InstallParams) => () => dispatch(appInstallationsRequestInstall(params))
})

const AppConfirmInstallContentInnerWithConnect = connect(mapStateToProps, mapDispatchToProps)(AppConfirmInstallContent)

AppConfirmInstallContentInnerWithConnect.displayName = 'AppConfirmInstallContentInnerWithConnect'

export default AppConfirmInstallContentInnerWithConnect
