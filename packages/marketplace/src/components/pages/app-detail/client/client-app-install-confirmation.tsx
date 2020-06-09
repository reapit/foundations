import * as React from 'react'
import { useHistory } from 'react-router'
import { History } from 'history'
import { useDispatch, useSelector } from 'react-redux'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import { Button, Modal } from '@reapit/elements'
import { appInstallationsRequestInstall } from '@/actions/app-installations'
import { clientFetchAppDetail } from '@/actions/client'
import { Dispatch } from 'redux'
import CallToAction from '../../../ui/call-to-action'
import { selectClientId } from '@/selector/client'
import routes from '@/constants/routes'
import { selectInstallationFormState } from '@/selector/installations'
import { selectIsDesktopMode } from '@/selector/auth'
import { DESKTOP_REFRESH_URL } from '@/constants/desktop-urls'
import { canGoBack } from '@/utils/router-helper'

export type ClientAppInstallConfirmationProps = {
  appDetailData?: AppDetailModel
  visible: boolean
  closeInstallConfirmationModal: () => void
}

export const handleInstallAppSuccessCallback = (
  setIsSuccessAlertVisible: (isVisible: boolean) => void,
  closeInstallConfirmationModal: () => void,
  isDesktopMode: boolean,
) => {
  return () => {
    if (isDesktopMode) {
      window.location.href = DESKTOP_REFRESH_URL
    }
    closeInstallConfirmationModal()
    setIsSuccessAlertVisible(true)
  }
}

export const handleInstallButtonClick = (
  appId: string,
  clientId: string,
  dispatch: Dispatch<any>,
  setIsSuccessAlertVisible: (isVisible: boolean) => void,
  closeInstallConfirmationModal: () => void,
  isDesktopMode: boolean,
) => () => {
  dispatch(
    appInstallationsRequestInstall({
      appId,
      callback: handleInstallAppSuccessCallback(setIsSuccessAlertVisible, closeInstallConfirmationModal, isDesktopMode),
    }),
  )
}

export const handleSuccessAlertButtonClick = (history: History) => () => {
  if (canGoBack(history)) {
    history.goBack()
  }
  history.replace(routes.CLIENT)
}

export const handleSuccessAlertMessageAfterClose = (
  appId: string,
  clientId: string,
  setIsSuccessAlertVisible: (isVisible: boolean) => void,
  dispatch: Dispatch,
) => {
  return () => {
    dispatch(
      clientFetchAppDetail({
        id: appId,
        clientId,
      }),
    )
    setIsSuccessAlertVisible(false)
  }
}

const ClientAppInstallConfirmation: React.FC<ClientAppInstallConfirmationProps> = ({
  appDetailData,
  visible,
  closeInstallConfirmationModal,
}) => {
  const history = useHistory()
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = React.useState(false)
  const clientId = useSelector(selectClientId)
  const installationFormState = useSelector(selectInstallationFormState)
  const isDesktopMode = useSelector(selectIsDesktopMode)
  const isSubmitting = installationFormState === 'SUBMITTING'

  const { name, id = '', scopes = [] } = appDetailData || {}

  const dispatch = useDispatch()
  const onSuccessAlertButtonClick = React.useCallback(handleSuccessAlertButtonClick(history), [history])

  return (
    <>
      <Modal
        visible={visible}
        title={`Confirm ${name} installation`}
        afterClose={closeInstallConfirmationModal}
        footerItems={
          <>
            <Button
              dataTest="agree-btn"
              loading={isSubmitting}
              className={appPermissionContentStyles.installButton}
              type="button"
              variant="primary"
              onClick={handleInstallButtonClick(
                id,
                clientId,
                dispatch,
                setIsSuccessAlertVisible,
                closeInstallConfirmationModal,
                isDesktopMode,
              )}
            >
              Confirm
            </Button>
            <Button
              dataTest="disagree-btn"
              disabled={false}
              className={appPermissionContentStyles.installButton}
              type="button"
              variant="danger"
              onClick={closeInstallConfirmationModal}
            >
              Cancel
            </Button>
          </>
        }
      >
        <>
          {scopes.length ? (
            <div>
              <p>
                This action will install the app for ALL platform users.
                <br />
                {name} requires the permissions below. By installing you are granting permission to your data.
              </p>
              <ul className={appPermissionContentStyles.permissionList}>
                {scopes.map(({ description, name }) => (
                  <li key={name} className={appPermissionContentStyles.permissionListItem}>
                    {description}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>This action will install the app for ALL platform users.</p>
          )}
        </>
      </Modal>
      {isSuccessAlertVisible && (
        <Modal
          visible={isSuccessAlertVisible}
          afterClose={handleSuccessAlertMessageAfterClose(id, clientId, setIsSuccessAlertVisible, dispatch)}
        >
          <>
            <CallToAction
              title="Success"
              buttonText="Back to List"
              dataTest="installations-success-message"
              buttonDataTest="installations-success-button"
              onButtonClick={onSuccessAlertButtonClick}
              isCenter
            >
              {name} has been successfully installed
            </CallToAction>
          </>
        </Modal>
      )}
    </>
  )
}

export default ClientAppInstallConfirmation
