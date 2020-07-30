import * as React from 'react'
import { useHistory } from 'react-router'
import { History } from 'history'
import { useDispatch, useSelector } from 'react-redux'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import { Button, ModalV2, GridFourCol, GridFourColItem, Content, ModalPropsV2 } from '@reapit/elements'
import { appInstallationsRequestInstall } from '@/actions/installations'
import { fetchAppDetail } from '@/actions/apps'
import { Dispatch } from 'redux'
import CallToAction from '@/components/ui/call-to-action'
import routes from '@/constants/routes'
import { selectInstallationFormState } from '@/selector/installations'
import { selectClientId } from '@/selector/auth'
import { DESKTOP_REFRESH_URL } from '@/constants/desktop-urls'
import { canGoBack } from '@/utils/router-helper'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export type AppInstallConfirmationProps = {
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
  history.replace(routes.APPS)
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

export type InstallAppSucesfullyModalParams = Pick<ModalPropsV2, 'afterClose' | 'visible'> &
  Pick<AppInstallConfirmationProps, 'appDetailData'> & { onSuccessAlertButtonClick: () => void }

export const InstallNonDirectApiAppSucesfullyModal = ({
  afterClose,
  appDetailData,
  onSuccessAlertButtonClick,
  visible,
}: InstallAppSucesfullyModalParams) => {
  const { name } = appDetailData || {}
  return (
    <ModalV2 isCentered isPadding={false} visible={Boolean(visible)} onClose={afterClose}>
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
    </ModalV2>
  )
}

export const InstallDirectApiAppSucesfullyModal = ({
  afterClose,
  appDetailData,
  onSuccessAlertButtonClick,
  visible,
}: InstallAppSucesfullyModalParams) => {
  const { name, launchUri, developer } = appDetailData || {}
  return (
    <ModalV2 isCentered isPadding={false} visible={Boolean(visible)} onClose={afterClose}>
      <CallToAction
        title="Success"
        buttonText="Back to List"
        dataTest="installations-success-message"
        buttonDataTest="installations-success-button"
        onButtonClick={onSuccessAlertButtonClick}
        isCenter
      >
        <p className="mb-5">{name} has been successfully installed.</p>

        <p className="mb-5">
          To launch, please use <a href={launchUri}>{launchUri}</a>
        </p>

        <p>
          If there are any additional setup requirements, a member of {developer} will be in touch to help you through
          the process.
        </p>
      </CallToAction>
    </ModalV2>
  )
}

const AppInstallConfirmation: React.FC<AppInstallConfirmationProps> = ({
  appDetailData,
  visible,
  closeInstallConfirmationModal,
}) => {
  const history = useHistory()
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = React.useState(false)
  const { connectSession, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const clientId = selectClientId(connectSession)
  const installationFormState = useSelector(selectInstallationFormState)
  const isSubmitting = installationFormState === 'SUBMITTING'

  const { name, id = '', scopes = [] } = appDetailData || {}

  const dispatch = useDispatch()
  const onSuccessAlertButtonClick = React.useCallback(handleSuccessAlertButtonClick(history), [history])

  const isDirectApi = appDetailData?.isDirectApi
  const shouldRenderDirectApiAppInstallSuccessfullyModal = isSuccessAlertVisible && isDirectApi
  const shouldRenderInstallNonDirectApiAppSuccessfullyModal = isSuccessAlertVisible && !isDirectApi

  // TODO: WIP: update AppInstallConfirmation to use Modal V2
  return (
    <>
      <ModalV2
        visible={visible}
        title={`Confirm ${name} installation`}
        onClose={closeInstallConfirmationModal}
        isCentered
        footer={
          <div className="flex">
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
                connectIsDesktop,
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
          </div>
        }
      >
        <>
          {scopes.length ? (
            <Content>
              <p>
                You are about to install ‘{name}’ for <b>all</b> members of your organisation.
              </p>
              <p>By installing this app, you are granting the following permissions to your data:</p>
              <p>
                <b>Data Permissions</b>
              </p>
              <p>Information about your organisation and the names/email addresses of your users</p>
              <GridFourCol>
                {scopes.map(scope => (
                  <GridFourColItem key={scope.name}>{scope?.description ?? ''}</GridFourColItem>
                ))}
              </GridFourCol>
            </Content>
          ) : (
            <p>This action will install the app for ALL platform users.</p>
          )}
        </>
      </ModalV2>
      <InstallDirectApiAppSucesfullyModal
        visible={shouldRenderDirectApiAppInstallSuccessfullyModal}
        afterClose={handleSuccessAlertMessageAfterClose(id, clientId, setIsSuccessAlertVisible, dispatch)}
        appDetailData={appDetailData}
        onSuccessAlertButtonClick={onSuccessAlertButtonClick}
      />

      <InstallNonDirectApiAppSucesfullyModal
        visible={shouldRenderInstallNonDirectApiAppSuccessfullyModal}
        afterClose={handleSuccessAlertMessageAfterClose(id, clientId, setIsSuccessAlertVisible, dispatch)}
        appDetailData={appDetailData}
        onSuccessAlertButtonClick={onSuccessAlertButtonClick}
      />
    </>
  )
}

export default AppInstallConfirmation
