import * as React from 'react'
import { History } from 'history'
import { useHistory } from 'react-router'
import ClientAppUninstallConfirmation from '@/components/ui/client-app-detail/client-app-uninstall-confirmation'
import { DesktopIntegrationTypeModel } from '@/actions/app-integration-types'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'
import { selectIntegrationTypes } from '@/selector/integration-types'
import { useSelector, useDispatch } from 'react-redux'
import { selectAppDetailData, selectAppDetailLoading, selectAppDetailError } from '@/selector/client-app-detail'
import { selectLoginType, selectIsAdmin } from '@/selector/auth'
import ClientAppHeader from '@/components/ui/client-app-detail/client-app-header'
import AppContent from './app-content'
import { Loader, Button, Alert, FormSection } from '@reapit/elements'
import clientAppDetailStyles from '@/styles/pages/client-app-detail.scss?mod'
import ClientAppInstallConfirmation from '@/components/ui/client-app-detail/client-app-install-confirmation'
import { Aside } from './aside'
import { clientFetchAppDetailFailed } from '@/actions/client'
import { developerApplyAppDetails } from '@/actions/developer'
import { useParams } from 'react-router'
import { Dispatch } from 'redux'
import { getDesktopIntegrationTypes } from '@/utils/get-desktop-integration-types'
import Routes from '@/constants/routes'
import { LoginType } from '@reapit/cognito-auth'
import useReactResponsive from '@/components/hooks/useReactResponsive'
import { ContactDeveloperSection } from './contact-developer-section'

export type ClientAppDetailProps = {}

export const handleCloseInstallConfirmationModal = (setIsVisibleInstallConfirmation: (isVisible: boolean) => void) => {
  return () => {
    setIsVisibleInstallConfirmation(false)
  }
}

export const handleInstallAppButtonClick = (setIsVisibleInstallConfirmation: (isVisible: boolean) => void) => {
  return () => {
    setIsVisibleInstallConfirmation(true)
  }
}

export const handleCloseUnInstallConfirmationModal = (
  setIsVisibleUnInstallConfirmation: (isVisible: boolean) => void,
) => {
  return () => {
    setIsVisibleUnInstallConfirmation(false)
  }
}

export const handleUnInstallAppButtonClick = (setIsVisibleUnInstallConfirmation: (isVisible: boolean) => void) => {
  return () => {
    setIsVisibleUnInstallConfirmation(true)
  }
}

export const onBackToAppsButtonClick = (history: History, loginType: LoginType) => {
  return () => {
    if (loginType === 'DEVELOPER') {
      history.push(Routes.DEVELOPER_MY_APPS)
    }
    history.push(Routes.CLIENT)
  }
}

export const handleApplyAppDetailsFromLocalStorage = (
  dispatch: Dispatch,
  loginType: LoginType,
  appId?: string,
) => () => {
  if (loginType !== 'DEVELOPER' || !appId) return
  try {
    const appDataString = localStorage.getItem('developer-preview-app')
    if (!appDataString) {
      throw 'No app preview'
    }

    const appData = JSON.parse(appDataString)
    if (appData.id !== appId) {
      throw 'No app preview'
    }

    dispatch(developerApplyAppDetails(appData))
  } catch (err) {
    dispatch(clientFetchAppDetailFailed(err))
  }
}

export const renderAppHeaderButtonGroup = (
  id: string,
  installedOn: string,
  onInstallConfirmationModal: () => void,
  onUninstallConfirmationModal: () => void,
  isInstallBtnHidden: boolean,
) => {
  return (
    <>
      {id && (
        <div className={clientAppDetailStyles.headerButtonGroup}>
          {installedOn ? (
            <Button
              onClick={onUninstallConfirmationModal}
              dataTest="detail-modal-uninstall-button"
              type="button"
              variant="primary"
              className="ml-0"
            >
              Uninstall App
            </Button>
          ) : (
            isInstallBtnHidden || (
              <Button
                dataTest="detail-modal-install-button"
                type="button"
                variant="primary"
                className="ml-0"
                onClick={onInstallConfirmationModal}
              >
                Install App
              </Button>
            )
          )}
        </div>
      )}
    </>
  )
}

const ClientAppDetail: React.FC<ClientAppDetailProps> = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { appId } = useParams()

  const [isVisibleInstallConfirmation, setIsVisibleInstallConfirmation] = React.useState(false)
  const [isVisibleUninstallConfirmation, setIsVisibleUninstallConfirmation] = React.useState(false)
  const closeInstallConfirmationModal = React.useCallback(
    handleCloseInstallConfirmationModal(setIsVisibleInstallConfirmation),
    [],
  )

  const onInstallConfirmationModal = React.useCallback(handleInstallAppButtonClick(setIsVisibleInstallConfirmation), [])
  const onUninstsallConfirmationModal = React.useCallback(
    handleUnInstallAppButtonClick(setIsVisibleUninstallConfirmation),
    [],
  )
  const closeUninstallConfirmationModal = React.useCallback(
    handleCloseInstallConfirmationModal(setIsVisibleUninstallConfirmation),
    [],
  )

  const desktopIntegrationTypes = useSelector(selectIntegrationTypes) as DesktopIntegrationTypeModel[]
  const appDetailData = useSelector(selectAppDetailData) as AppDetailDataNotNull
  const userDesktopIntegrationTypes = getDesktopIntegrationTypes(
    appDetailData.desktopIntegrationTypeIds || [],
    desktopIntegrationTypes,
  )
  const { isMobile } = useReactResponsive()

  const isLoadingAppDetail = useSelector(selectAppDetailLoading)
  const loginType = useSelector(selectLoginType)
  const isAdmin = useSelector(selectIsAdmin)
  const error = useSelector(selectAppDetailError)

  const isInstallBtnHidden = loginType === 'CLIENT' && !isAdmin
  // selector selectAppDetailData return {} if not data
  const unfetched = Object.keys(appDetailData).length === 0
  const { id = '', installedOn = '', developer, telephone, supportEmail, homePage } = appDetailData

  React.useEffect(handleApplyAppDetailsFromLocalStorage(dispatch, loginType, appId), [dispatch])

  if (error) return <Alert message={error} type="danger"></Alert>
  if (isLoadingAppDetail || unfetched) {
    return <Loader dataTest="client-app-detail-loader" />
  }

  return (
    <div data-test="client-app-detail-container" className={clientAppDetailStyles.appDetailContainer}>
      {!isMobile && <Aside appDetailData={appDetailData} desktopIntegrationTypes={userDesktopIntegrationTypes} />}
      <div className={clientAppDetailStyles.mainContainer}>
        <ClientAppHeader
          appDetailData={appDetailData}
          buttonGroup={renderAppHeaderButtonGroup(
            id,
            installedOn,
            onInstallConfirmationModal,
            onUninstsallConfirmationModal,
            isInstallBtnHidden,
          )}
        />
        <AppContent desktopIntegrationTypes={userDesktopIntegrationTypes} appDetailData={appDetailData} />
        <FormSection className={clientAppDetailStyles.footerContainer}>
          <div className={clientAppDetailStyles.hiddenInDesktopScreenSize}>
            <ContactDeveloperSection
              contact={{
                developer,
                telephone,
                supportEmail,
                homePage,
              }}
              hasGutter={false}
            />
          </div>
          <Button onClick={onBackToAppsButtonClick(history, loginType)}>Back To Apps</Button>
        </FormSection>
        {isVisibleUninstallConfirmation && (
          <ClientAppUninstallConfirmation
            visible={isVisibleUninstallConfirmation}
            appDetailData={appDetailData}
            closeUninstallConfirmationModal={closeUninstallConfirmationModal}
          />
        )}
        {isVisibleInstallConfirmation && (
          <ClientAppInstallConfirmation
            visible={isVisibleInstallConfirmation}
            appDetailData={appDetailData}
            closeInstallConfirmationModal={closeInstallConfirmationModal}
          />
        )}
      </div>
    </div>
  )
}

export default ClientAppDetail
