import * as React from 'react'
import { useHistory } from 'react-router'
import { History } from 'history'
import { useDispatch, useSelector } from 'react-redux'
import { css } from 'linaria'
import { AppDetailModel, DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import * as appPermissionContentStyles from '../__styles__/app-permission-content'
import { Button, ModalV2, GridFourCol, GridFourColItem, Content, ModalPropsV2, H5 } from '@reapit/elements'
import { installApp } from '@/actions/installations'
import { fetchAppDetail } from '@/actions/apps'
import { Dispatch } from 'redux'
import CallToAction from '@/components/ui/call-to-action'
import routes from '@/constants/routes'
import { selectInstallAppState } from '@/selector/installations'
import { selectClientId, selectIsFoundationsAdmin, selectIsOrgAdmin, selectOffGroupName } from '@/selector/auth'
import { DESKTOP_REFRESH_URL } from '@/constants/desktop-urls'
import { canGoBack } from '@/utils/router-helper'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { getDesktopIntegrationTypes } from '../../../../utils/get-desktop-integration-types'
import { selectDesktopIntegrationTypes } from '../../../../selector/desktop-integration-types'
import { truncate } from '../__styles__/app-install-confirmation'
import { SetStateAction } from 'react'

export type AppInstallConfirmationProps = {
  appDetailData?: AppDetailModel
  visible: boolean
  closeInstallConfirmationModal: () => void
}

export interface InstallForGroupHeadingProps {
  name: string
  clientId: string
  setClientIdToInstall: React.Dispatch<SetStateAction<string>>
  clientIdToInstall: string
  isOrgAdmin: boolean
  isFoundationsAdmin: boolean
  offGroupName: string
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
    installApp({
      appId,
      clientId,
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
  Pick<AppInstallConfirmationProps, 'appDetailData'> & {
    onSuccessAlertButtonClick: () => void
    isDesktopMode: Boolean
  }

const btnGroup = css`
  margin-top: 20px;
`

export const InstallNonDirectApiAppSucesfullyModal = ({
  afterClose,
  appDetailData,
  onSuccessAlertButtonClick,
  visible,
  isDesktopMode,
}: InstallAppSucesfullyModalParams) => {
  const { name } = appDetailData || {}

  return (
    <ModalV2 isCentered hasHeader={false} isPadding={false} visible={Boolean(visible)} onClose={afterClose}>
      <CallToAction
        title="Success"
        buttonDataTest="installations-success-button-back"
        onButtonClick={onSuccessAlertButtonClick}
        isCenter
        footerItems={
          <div className={btnGroup}>
            <Button
              dataTest="installations-success-message"
              variant="primary"
              type="button"
              onClick={onSuccessAlertButtonClick as () => void}
            >
              Back To List
            </Button>

            {isDesktopMode ? (
              <a href={`agencycloud://app?id=${appDetailData?.id}&launchUri=${appDetailData?.launchUri}`}>
                <Button dataTest="installations-success-message-launch" variant="primary" type="button">
                  Launch App
                </Button>
              </a>
            ) : (
              <a href={appDetailData?.launchUri} target="_blank" rel="noopener noreferrer">
                <Button dataTest="installations-success-message-launch" variant="primary" type="button">
                  Launch App
                </Button>
              </a>
            )}
          </div>
        }
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
  isDesktopMode,
}: InstallAppSucesfullyModalParams) => {
  const { name, launchUri, developer } = appDetailData || {}
  return (
    <ModalV2 isCentered hasHeader={false} isPadding={false} visible={Boolean(visible)} onClose={afterClose}>
      <CallToAction
        title="Success"
        buttonText="Back to List"
        dataTest="installations-success-message"
        buttonDataTest="installations-success-button"
        onButtonClick={onSuccessAlertButtonClick}
        isCenter
      >
        <p className="mb-5">{name} has been successfully installed.</p>

        <p className="mb-5 flex v-align-middle">
          To launch, please use{' '}
          <a className={truncate} href={isDesktopMode ? `agencycloud://process/webpage?url=${launchUri}` : launchUri}>
            {launchUri}
          </a>
        </p>

        <p>
          If there are any additional setup requirements, a member of {developer} will be in touch to help you through
          the process.
        </p>
      </CallToAction>
    </ModalV2>
  )
}

export const InstallForGroupHeading: React.FC<InstallForGroupHeadingProps> = ({
  clientId,
  name,
  setClientIdToInstall,
  clientIdToInstall,
  isOrgAdmin,
  isFoundationsAdmin,
  offGroupName,
}) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const orgClientId = clientId.split('-')[0]

  return offGroupName && isOrgAdmin ? (
    <>
      <p>
        You have the option to install ‘{name}’ for either your Office Group or for <b>all</b> Users and Offices within
        your Organisation.
      </p>
      <div className="field field-checkbox mb-4 control">
        <input
          className="checkbox"
          type="radio"
          id="group"
          checked={clientId === clientIdToInstall}
          onChange={() => setClientIdToInstall(clientId)}
        />
        <label className="label" htmlFor="group">
          Install for my office group {connectSession?.loginIdentity.offGroupName}
        </label>
      </div>
      <div className="field field-checkbox mb-4 control">
        <input
          className="checkbox"
          type="radio"
          id="org"
          checked={orgClientId === clientIdToInstall}
          onChange={() => setClientIdToInstall(orgClientId)}
        />
        <label className="label" htmlFor="org">
          Install for the whole organisation
        </label>
      </div>
    </>
  ) : offGroupName && isFoundationsAdmin ? (
    <p>
      You are about to install ‘{name}’ for your Office Group {connectSession?.loginIdentity.offGroupName}
    </p>
  ) : (
    <p>
      You are about to install ‘{name}’ for <b>all</b> Users and Offices within your Organisation.
    </p>
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
  const isOrgAdmin = selectIsOrgAdmin(connectSession)
  const isFoundationsAdmin = selectIsFoundationsAdmin(connectSession)
  const offGroupName = selectOffGroupName(connectSession)
  const [clientIdToInstall, setClientIdToInstall] = React.useState(clientId)
  const installationFormState = useSelector(selectInstallAppState)
  const isLoading = installationFormState?.isLoading

  const { name, id = '', scopes = [], isFree, pricingUrl, developer, desktopIntegrationTypeIds } = appDetailData || {}

  const desktopIntegrationTypes = useSelector(selectDesktopIntegrationTypes) as DesktopIntegrationTypeModel[]
  const userDesktopIntegrationTypes = getDesktopIntegrationTypes(
    desktopIntegrationTypeIds || [],
    desktopIntegrationTypes,
  )

  React.useEffect(() => {
    if (clientId !== 'SBOX' && clientIdToInstall === 'SBOX') {
      setClientIdToInstall(clientId)
    }
  }, [clientId, clientIdToInstall])

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
              dataTest="disagree-btn"
              disabled={false}
              className={appPermissionContentStyles.installButton}
              type="button"
              variant="secondary"
              onClick={closeInstallConfirmationModal}
            >
              Cancel
            </Button>
            <Button
              dataTest="agree-btn"
              loading={isLoading}
              className={appPermissionContentStyles.installButton}
              type="button"
              variant="primary"
              onClick={handleInstallButtonClick(
                id,
                clientIdToInstall,
                dispatch,
                setIsSuccessAlertVisible,
                closeInstallConfirmationModal,
                connectIsDesktop,
              )}
            >
              Confirm
            </Button>
          </div>
        }
      >
        <Content>
          <InstallForGroupHeading
            name={name ?? ''}
            clientId={clientId}
            setClientIdToInstall={setClientIdToInstall}
            clientIdToInstall={clientIdToInstall}
            isOrgAdmin={isOrgAdmin}
            isFoundationsAdmin={isFoundationsAdmin}
            offGroupName={offGroupName}
          />
          {userDesktopIntegrationTypes.length ? (
            <>
              <H5 className="mb-2">Desktop Integration</H5>
              <p>
                This app requires the following Desktop Integration. Some integration types may replace or change
                certain behaviours within Agency Cloud.
              </p>
              <ul className="ml-4">
                {userDesktopIntegrationTypes.map(integration => (
                  <li key={integration.name}>{integration?.description ?? ''}</li>
                ))}
              </ul>
              <p>
                For more information regarding Desktop Integration types, please{' '}
                {connectIsDesktop ? (
                  <a
                    href={
                      'agencycloud://process/webpage?url=https://marketplace-documentation.reapit.cloud/integration-types'
                    }
                  >
                    click here
                  </a>
                ) : (
                  <a
                    href="https://marketplace-documentation.reapit.cloud/integration-types"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    click here
                  </a>
                )}
                .
              </p>
            </>
          ) : null}
          <H5 className="mb-2">Pricing Information</H5>
          {isFree ? (
            <p>{developer} have specified there is no cost for using this App/Integration.</p>
          ) : pricingUrl ? (
            <>
              <p>
                {developer} have specified that there is a cost for using this App/Integration, please{' '}
                {connectIsDesktop ? (
                  <a href={`agencycloud://process/webpage?url=${pricingUrl}`}>click here</a>
                ) : (
                  <a href={pricingUrl} target="_blank" rel="noopener noreferrer">
                    click here
                  </a>
                )}{' '}
                to view their pricing information. You will be billed directly by {developer}.
              </p>
              {developer !== 'Reapit Ltd' && (
                <p>You will not be charged by Reapit Ltd for any costs associated with using this App/Integration.</p>
              )}
            </>
          ) : (
            <p>
              There may be a cost associated to using this App/Integration. However, this information has not yet been
              provided by {developer}. Please contact {developer} directly for information about pricing.
            </p>
          )}
          <>
            <H5 className="mb-2">Data Permissions</H5>
            <p>By installing this app, you are granting the following permissions to your data:</p>
            <p>Information about your organisation and the names/email addresses of your users</p>
            {scopes.length && (
              <GridFourCol>
                {scopes.map(scope => (
                  <GridFourColItem key={scope.name}>{scope?.description ?? ''}</GridFourColItem>
                ))}
              </GridFourCol>
            )}
          </>
        </Content>
      </ModalV2>
      <InstallDirectApiAppSucesfullyModal
        visible={shouldRenderDirectApiAppInstallSuccessfullyModal}
        afterClose={handleSuccessAlertMessageAfterClose(id, clientId, setIsSuccessAlertVisible, dispatch)}
        appDetailData={appDetailData}
        onSuccessAlertButtonClick={onSuccessAlertButtonClick}
        isDesktopMode={connectIsDesktop}
      />

      <InstallNonDirectApiAppSucesfullyModal
        visible={shouldRenderInstallNonDirectApiAppSuccessfullyModal}
        afterClose={handleSuccessAlertMessageAfterClose(id, clientId, setIsSuccessAlertVisible, dispatch)}
        appDetailData={appDetailData}
        onSuccessAlertButtonClick={onSuccessAlertButtonClick}
        isDesktopMode={connectIsDesktop}
      />
    </>
  )
}

export default AppInstallConfirmation
