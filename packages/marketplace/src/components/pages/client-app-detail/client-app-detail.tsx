import * as React from 'react'
import {
  handleUninstallAppButtonClick,
  handleCloseUninstallConfirmationModal,
} from '../client-app-detail-manage/client-app-detail-manage'
import ClientAppUninstallConfirmation from '@/components/ui/client-app-detail/client-app-uninstall-confirmation'
import { DesktopIntegrationTypeModel } from '@/actions/app-integration-types'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'
import { selectIntegrationTypes } from '@/selector/integration-types'
import { useSelector, useDispatch } from 'react-redux'
import { selectAppDetailData, selectAppDetailLoading, selectAppDetailError } from '@/selector/client-app-detail'
import { selectLoginType, selectIsAdmin } from '@/selector/auth'
import AppHeader from '@/components/ui/standalone-app-detail/app-header'
import AppContent from './app-content'
import { Loader, Button, Alert } from '@reapit/elements'
import clientAppDetailStyles from '@/styles/pages/client-app-detail.scss?mod'
import ClientAppInstallConfirmation from '@/components/ui/client-app-detail/client-app-install-confirmation'
import { Aside } from './aside'
import { clientFetchAppDetailFailed } from '@/actions/client'
import { developerApplyAppDetails } from '@/actions/developer'
import { useParams } from 'react-router'
import { Dispatch } from 'redux'
import { getDesktopIntegrationTypes } from '@/utils/get-desktop-integration-types'

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

export const handleApplyAppDetailsFromLocalStorage = (dispatch: Dispatch, appId?: string) => () => {
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
        <div className="flex ml-auto">
          {installedOn ? (
            <Button
              onClick={onUninstallConfirmationModal}
              dataTest="detail-modal-uninstall-button"
              type="button"
              variant="primary"
            >
              Uninstall App
            </Button>
          ) : (
            isInstallBtnHidden || (
              <Button
                dataTest="detail-modal-install-button"
                type="button"
                variant="primary"
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
  const { appId } = useParams()

  const [isVisibleInstallConfirmation, setIsVisibleInstallConfirmation] = React.useState(false)
  const [isVisibleUninstallConfirmation, setIsVisibleUninstallConfirmation] = React.useState(false)
  const closeUninstallConfirmationModal = React.useCallback(
    handleCloseUninstallConfirmationModal(setIsVisibleUninstallConfirmation),
    [],
  )
  const closeInstallConfirmationModal = React.useCallback(
    handleCloseInstallConfirmationModal(setIsVisibleInstallConfirmation),
    [],
  )

  const onInstallConfirmationModal = React.useCallback(handleInstallAppButtonClick(setIsVisibleInstallConfirmation), [])
  const onUninstsallConfirmationModal = React.useCallback(
    handleUninstallAppButtonClick(setIsVisibleUninstallConfirmation),
    [],
  )

  const desktopIntegrationTypes = useSelector(selectIntegrationTypes) as DesktopIntegrationTypeModel[]
  const appDetailData = useSelector(selectAppDetailData) as AppDetailDataNotNull
  const userDesktopIntegrationTypes = getDesktopIntegrationTypes(
    appDetailData.desktopIntegrationTypeIds || [],
    desktopIntegrationTypes,
  )
  const isLoadingAppDetail = useSelector(selectAppDetailLoading)
  const loginType = useSelector(selectLoginType)
  const isAdmin = useSelector(selectIsAdmin)
  const error = useSelector(selectAppDetailError)

  const isInstallBtnHidden = loginType === 'CLIENT' && !isAdmin
  // selector selectAppDetailData return {} if not data
  const unfetched = Object.keys(appDetailData).length === 0
  const { id = '', installedOn = '' } = appDetailData

  React.useEffect(handleApplyAppDetailsFromLocalStorage(dispatch, appId), [dispatch])

  if (error) return <Alert message={error} type="danger"></Alert>
  if (isLoadingAppDetail || unfetched) {
    return <Loader dataTest="client-app-detail-loader" />
  }

  return (
    <div data-test="client-app-detail-container" className={clientAppDetailStyles.appDetailContainer}>
      <Aside appDetailData={appDetailData} desktopIntegrationTypes={userDesktopIntegrationTypes} />
      <div className={clientAppDetailStyles.mainContainer}>
        <AppHeader
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
