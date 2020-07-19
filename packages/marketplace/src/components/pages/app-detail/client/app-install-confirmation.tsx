import * as React from 'react'
import { useHistory } from 'react-router'
import { History } from 'history'
import { useDispatch, useSelector } from 'react-redux'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import { Button, Modal, ModalV2, GridFourCol, GridFourColItem, Content, ModalPropsV2 } from '@reapit/elements'
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
      clientFetchAppDetail({
        id: appId,
        clientId,
      }),
    )
    setIsSuccessAlertVisible(false)
  }
}

export type InstallAppSucesfullyModalParams = Pick<ModalPropsV2, 'afterClose' | 'visible'> &
  Pick<AppInstallConfirmationProps, 'appDetailData'> & { onSuccessAlertButtonClick: () => void }

// TODO: clone bellow
// replcae children

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
        <p className="mb-2">{name} has been successfully installed.</p>

        <p className="mb-2">
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
  const clientId = useSelector(selectClientId)
  const installationFormState = useSelector(selectInstallationFormState)
  const isDesktopMode = useSelector(selectIsDesktopMode)
  const isSubmitting = installationFormState === 'SUBMITTING'

  const { name, id = '', scopes = [] } = appDetailData || {}

  const dispatch = useDispatch()
  const onSuccessAlertButtonClick = React.useCallback(handleSuccessAlertButtonClick(history), [history])

  {
    /* TODO: declare isSuccess && isDirectApi - shouldRenderDirectApiAppInstallSuccessfullyModal */
  }
  const isDirectApi = appDetailData?.isDirectApi
  const shouldRenderDirectApiAppInstallSuccessfullyModal = isSuccessAlertVisible && isDirectApi
  {
    /* TODO: declare isSuccess && !isDirectApi - shouldRenderNonDirectApiAppInstallSuccessfullyModal */
  }
  const shouldRenderInstallNonDirectApiAppSuccessfullyModal = isSuccessAlertVisible && !isDirectApi

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
            <Content>
              <p>This action will install the app for ALL platform users.</p>
              <p>{name} requires the permissions below. By installing you are granting permission to your data.</p>
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
      </Modal>
      {/* TODO: WIP replace modal with modal v2 */}
      <InstallDirectApiAppSucesfullyModal
        visible={shouldRenderDirectApiAppInstallSuccessfullyModal}
        afterClose={handleSuccessAlertMessageAfterClose(id, clientId, setIsSuccessAlertVisible, dispatch)}
        appDetailData={appDetailData}
        onSuccessAlertButtonClick={onSuccessAlertButtonClick}
      />

      {/* TODO: add other if clause to render isSuccess && !isDirectApi - shouldRenderNonDirectApiAppInstallSuccessfullyModal */}
      {/* TODO: Remove check when render modal */}
      {/* TODO: WIP Extract model */}
      {/* {isSuccessAlertVisible && (
        <Modal
          visible={isSuccessAlertVisible}
          afterClose={handleSuccessAlertMessageAfterClose(id, clientId, setIsSuccessAlertVisible, dispatch)}
          HeaderComponent={() => (
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
          )}
        />
      )} */}
    </>
  )
}

export default AppInstallConfirmation
