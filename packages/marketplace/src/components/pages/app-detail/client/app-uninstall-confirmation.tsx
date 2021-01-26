import * as React from 'react'
import { useHistory } from 'react-router'
import { History } from 'history'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import * as appPermissionContentStyles from '../__styles__/app-permission-content'
import { fetchAppDetail } from '@/actions/apps'
import { Button, ModalV2, ModalPropsV2 } from '@reapit/elements'
import { uninstallApp } from '@/actions/installations'
import CallToAction from '@/components/ui/call-to-action'
import { selectUninstallAppState } from '@/selector/installations'
import routes from '@/constants/routes'
import { selectClientId, selectIsFoundationsAdmin, selectOffGroupName } from '@/selector/auth'
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
  setHasPermissionError: (hasPermissionError: boolean) => void,
  isDesktopMode: boolean,
) => {
  return (hasPermissionError: boolean) => {
    if (isDesktopMode) {
      window.location.href = DESKTOP_REFRESH_URL
    }
    if (hasPermissionError) {
      setHasPermissionError(true)
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
  setHasPermissionError: (hasPermissionError: boolean) => void,
  isDesktopMode: boolean,
) => {
  return () => {
    dispatch(
      uninstallApp({
        appId,
        installationId,
        terminatedReason: 'User uninstall',
        callback: handleUninstallAppSuccessCallback(
          setIsSuccessAlertVisible,
          closeUninstallConfirmationModal,
          setHasPermissionError,
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
  setHasPermissionError: (hasPermissionError: boolean) => void,
  isDesktopMode: boolean,
) => {
  return (
    <div className="flex">
      <Button
        dataTest="disagree-btn"
        disabled={false}
        className={appPermissionContentStyles.installButton}
        type="button"
        variant="secondary"
        onClick={closeUninstallConfirmationModal}
      >
        Cancel
      </Button>
      <Button
        dataTest="agree-btn"
        loading={isSubmitting}
        className={appPermissionContentStyles.installButton}
        type="button"
        variant="danger"
        onClick={onUninstallButtonClick(
          id,
          clientId,
          installationId,
          dispatch,
          setIsSuccessAlertVisible,
          closeUninstallConfirmationModal,
          setHasPermissionError,
          isDesktopMode,
        )}
      >
        Confirm
      </Button>
    </div>
  )
}

export type UninstallationsSuccessModalParams = Pick<ModalPropsV2, 'afterClose' | 'visible'> & {
  appDetailData?: AppDetailModel
  onSuccessAlertButtonClick: () => void
  hasPermissionError: boolean
}

export const UninstallationsSuccessModal = ({
  afterClose,
  appDetailData,
  onSuccessAlertButtonClick,
  hasPermissionError,
  visible,
}: UninstallationsSuccessModalParams) => {
  const { name: appName } = appDetailData || {}
  return (
    <ModalV2 isCentered hasHeader={false} isPadding={false} visible={Boolean(visible)} onClose={afterClose}>
      <CallToAction
        title={hasPermissionError ? `Uninstalling ${appName}` : 'Success'}
        buttonText="Back to List"
        type={hasPermissionError ? 'danger' : 'success'}
        dataTest="uinstallations-success-message"
        buttonDataTest="uinstallations-success-button"
        onButtonClick={onSuccessAlertButtonClick}
        isCenter
      >
        {hasPermissionError ? (
          <>Your organisation settings prevent you from uninstalling this app, please contact an Administrator.</>
        ) : (
          <>{appName} has been successfully uninstalled</>
        )}
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
  const [hasPermissionError, setHasPermissionError] = React.useState(false)
  const history = useHistory()
  const { connectSession, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const clientId = selectClientId(connectSession)
  const installationFormState = useSelector(selectUninstallAppState)
  const isFoundationsAdmin = selectIsFoundationsAdmin(connectSession)
  const offGroupName = selectOffGroupName(connectSession)
  const isSubmitting = installationFormState?.isLoading
  const { name, id = '', installationId = '' } = appDetailData || {}
  const dispatch = useDispatch()
  const onSuccessAlertButtonClick = React.useCallback(handleSuccessAlertButtonClick(history), [history])

  return (
    <>
      <ModalV2
        visible={visible}
        isCentered
        title={`Confirm ${name} uninstallation`}
        afterClose={() => closeUninstallConfirmationModal()}
        footer={renderUninstallConfirmationModalFooter(
          isSubmitting,
          id,
          clientId,
          installationId,
          dispatch,
          setIsSuccessAlertVisible,
          closeUninstallConfirmationModal,
          setHasPermissionError,
          connectIsDesktop,
        )}
      >
        {offGroupName && isFoundationsAdmin ? (
          <>
            Are you sure you wish to uninstall {name}? This action will uninstall the app for your group ‘
            {connectSession?.loginIdentity.offGroupName}’
          </>
        ) : (
          <>
            Are you sure you wish to uninstall {name}? This action will uninstall the app for <b>all</b> members of your
            organisation.
          </>
        )}
      </ModalV2>

      <UninstallationsSuccessModal
        visible={isSuccessAlertVisible}
        afterClose={handleSuccessAlertMessageAfterClose(id, clientId, setIsSuccessAlertVisible, dispatch)}
        onSuccessAlertButtonClick={onSuccessAlertButtonClick}
        appDetailData={appDetailData}
        hasPermissionError={hasPermissionError}
      />
    </>
  )
}

export default AppUninstallConfirmation
