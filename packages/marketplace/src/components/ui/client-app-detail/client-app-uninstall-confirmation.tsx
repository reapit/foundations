import * as React from 'react'
import { useHistory } from 'react-router'
import { History } from 'history'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import { Button, Modal } from '@reapit/elements'
import { clientFetchAppDetail } from '@/actions/client'
import { appInstallationsRequestUninstall } from '@/actions/app-installations'
import CallToAction from '../call-to-action'
import { selectClientId } from '@/selector/client'
import { selectInstallationFormState } from '@/selector/installations'
import routes from '@/constants/routes'
import { selectIsDesktopMode } from '@/selector/auth'
import { DESKTOP_REFRESH_URL } from '@/constants/desktop-urls'

export type ClientAppUninstallConfirmationProps = {
  appDetailData?: AppDetailModel
  visible: boolean
  closeUninstallConfirmationModal: () => void
}

export const handleUninstallAppSuccessCallback = (
  appId: string,
  clientId: string,
  dispatch: Dispatch<any>,
  setIsSuccessAlertVisible: (isVisible: boolean) => void,
  closeUninstallConfirmationModal: () => void,
  isDesktopMode: boolean,
) => {
  return () => {
    dispatch(
      clientFetchAppDetail({
        id: appId,
        clientId,
      }),
    )
    closeUninstallConfirmationModal()
    setIsSuccessAlertVisible(true)
    if (isDesktopMode) {
      window.location.href = DESKTOP_REFRESH_URL
    }
  }
}

export const onUninstallButtonClick = (
  appId: string,
  clientId: string,
  installationId: string,
  dispatch: Dispatch<any>,
  setIsSuccessAlertVisible: (isVisible: boolean) => void,
  closeUninstallConfirmationModal: () => void,
  isDesktopMode: boolean,
) => {
  return () => {
    dispatch(
      appInstallationsRequestUninstall({
        appId,
        installationId,
        terminatedReason: 'User uninstall',
        callback: handleUninstallAppSuccessCallback(
          appId,
          clientId,
          dispatch,
          setIsSuccessAlertVisible,
          closeUninstallConfirmationModal,
          isDesktopMode,
        ),
      }),
    )
  }
}

export const handleSuccessAlertButtonClick = (history: History) => {
  return () => {
    history.replace(routes.CLIENT)
  }
}

export const handleSuccessAlertMessageAfterClose = (setIsSuccessAlertVisible: (isVisible: boolean) => void) => {
  return () => {
    setIsSuccessAlertVisible(false)
  }
}

export const renderUninstallConfirmationModalFooter = (
  isSubmitting: boolean,
  id: string,
  clientId: string,
  installationId: string,
  dispatch: Dispatch<any>,
  setIsSuccessAlertVisible: (isVisible: boolean) => void,
  closeUninstallConfirmationModal: () => void,
  isDesktopMode: boolean,
) => {
  return (
    <>
      <Button
        dataTest="agree-btn"
        loading={isSubmitting}
        className={appPermissionContentStyles.installButton}
        type="button"
        variant="primary"
        onClick={onUninstallButtonClick(
          id,
          clientId,
          installationId,
          dispatch,
          setIsSuccessAlertVisible,
          closeUninstallConfirmationModal,
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
        onClick={closeUninstallConfirmationModal}
      >
        Cancel
      </Button>
    </>
  )
}

const ClientAppUninstallConfirmation: React.FC<ClientAppUninstallConfirmationProps> = ({
  appDetailData,
  visible,
  closeUninstallConfirmationModal,
}) => {
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = React.useState(false)
  const history = useHistory()
  const clientId = useSelector(selectClientId)
  const installationFormState = useSelector(selectInstallationFormState)
  const isDesktopMode = useSelector(selectIsDesktopMode)
  const isSubmitting = installationFormState === 'SUBMITTING'
  const { name, id = '', installationId = '' } = appDetailData || {}
  const dispatch = useDispatch()
  const onSuccessAlertButtonClick = React.useCallback(handleSuccessAlertButtonClick(history), [history])

  return (
    <>
      <Modal
        visible={visible}
        title={`Confirm ${name} uninstallation`}
        afterClose={closeUninstallConfirmationModal}
        footerItems={renderUninstallConfirmationModalFooter(
          isSubmitting,
          id,
          clientId,
          installationId,
          dispatch,
          setIsSuccessAlertVisible,
          closeUninstallConfirmationModal,
          isDesktopMode,
        )}
      >
        <>Are you sure you wish to uninstall {name}? This action will uninstall the app for ALL platform users</>
      </Modal>
      <Modal visible={isSuccessAlertVisible} afterClose={handleSuccessAlertMessageAfterClose(setIsSuccessAlertVisible)}>
        <>
          <CallToAction
            title="Success"
            buttonText="Back to List"
            dataTest="uinstallations-success-message"
            buttonDataTest="uinstallations-success-button"
            onButtonClick={onSuccessAlertButtonClick}
            isCenter
          >
            {name} has been successfully uninstalled
          </CallToAction>
        </>
      </Modal>
    </>
  )
}

export default ClientAppUninstallConfirmation
