import * as React from 'react'
import { useHistory } from 'react-router'
import { History } from 'history'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import { fetchAppDetail } from '@/actions/apps'
import { Button, ModalV2, ModalPropsV2 } from '@reapit/elements'
import { appInstallationsRequestUninstall } from '@/actions/installations'
import CallToAction from '@/components/ui/call-to-action'
import { selectInstallationFormState } from '@/selector/installations'
import routes from '@/constants/routes'
import { selectClientId } from '@/selector/auth'
import { DESKTOP_REFRESH_URL } from '@/constants/desktop-urls'
import { canGoBack } from '@/utils/router-helper'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

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
      fetchAppDetail({
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
    <div className="flex">
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
    </div>
  )
}

export type UninstallationsSuccessModalParams = Pick<ModalPropsV2, 'afterClose' | 'visible'> & {
  appDetailData?: AppDetailModel
  onSuccessAlertButtonClick: () => void
}

export const UninstallationsSuccessModal = ({
  afterClose,
  appDetailData,
  onSuccessAlertButtonClick,
  visible,
}: UninstallationsSuccessModalParams) => {
  const { name: appName } = appDetailData || {}
  return (
    <ModalV2 isCentered hasHeader={false} isPadding={false} visible={Boolean(visible)} onClose={afterClose}>
      <CallToAction
        title="Success"
        buttonText="Back to List"
        dataTest="uinstallations-success-message"
        buttonDataTest="uinstallations-success-button"
        onButtonClick={onSuccessAlertButtonClick}
        isCenter
      >
        {appName} has been successfully uninstalled
      </CallToAction>
    </ModalV2>
  )
}

const AppUninstallConfirmation: React.FC<AppUninstallConfirmationProps> = ({
  appDetailData,
  visible,
  closeUninstallConfirmationModal,
}) => {
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = React.useState(false)
  const history = useHistory()
  const { connectSession, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const clientId = selectClientId(connectSession)
  const installationFormState = useSelector(selectInstallationFormState)
  const isSubmitting = installationFormState === 'SUBMITTING'
  const { name, id = '', installationId = '' } = appDetailData || {}
  const dispatch = useDispatch()
  const onSuccessAlertButtonClick = React.useCallback(handleSuccessAlertButtonClick(history), [history])

  return (
    <>
      <ModalV2
        visible={visible}
        isCentered
        title={`Confirm ${name} uninstallation`}
        afterClose={closeUninstallConfirmationModal}
        footer={renderUninstallConfirmationModalFooter(
          isSubmitting,
          id,
          clientId,
          installationId,
          dispatch,
          setIsSuccessAlertVisible,
          closeUninstallConfirmationModal,
          connectIsDesktop,
        )}
      >
        <>
          Are you sure you wish to uninstall {name}? This action will uninstall the app for <b>all</b> members of your
          organisation.
        </>
      </ModalV2>

      <UninstallationsSuccessModal
        visible={isSuccessAlertVisible}
        afterClose={handleSuccessAlertMessageAfterClose(id, clientId, setIsSuccessAlertVisible, dispatch)}
        onSuccessAlertButtonClick={onSuccessAlertButtonClick}
        appDetailData={appDetailData}
      />
    </>
  )
}

export default AppUninstallConfirmation
