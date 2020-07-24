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
import CallToAction from '../../../ui/call-to-action'
import { selectClientId } from '@/selector/client'
import { selectInstallationFormState } from '@/selector/installations'
import routes from '@/constants/routes'
import { selectIsDesktopMode } from '@/selector/auth'
import { DESKTOP_REFRESH_URL } from '@/constants/desktop-urls'
import { canGoBack } from '@/utils/router-helper'

export type AppUninstallConfirmationProps = {
  appDetailData?: AppDetailModel
  visible: boolean
  closeUninstallConfirmationModal: () => void
}

export const handleUninstallAppSuccessCallback = (
  setIsSuccessAlertVisible: (isVisible: boolean) => void,
  closeUninstallConfirmationModal: () => void,
  isDesktopMode: boolean,
) => {
  return () => {
    if (isDesktopMode) {
      window.location.href = DESKTOP_REFRESH_URL
    }
    setIsSuccessAlertVisible(true)
    closeUninstallConfirmationModal()
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
    if (canGoBack(history)) {
      history.goBack()
    }
    history.replace(routes.APPS)
  }
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

const AppUninstallConfirmation: React.FC<AppUninstallConfirmationProps> = ({
  appDetailData,
  visible,
  closeUninstallConfirmationModal,
}) => {
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = React.useState(false)
  const history = useHistory()
  // FIXME(selectClientId)
  // Refetch app after un-install
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
      <Modal
        visible={isSuccessAlertVisible}
        afterClose={handleSuccessAlertMessageAfterClose(id, clientId, setIsSuccessAlertVisible, dispatch)}
        HeaderComponent={() => (
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
        )}
      />
    </>
  )
}

export default AppUninstallConfirmation
