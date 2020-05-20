import * as React from 'react'
import {
  handleUninstallAppButtonClick,
  handleCloseUninstallConfirmationModal,
} from '../client-app-detail-manage/client-app-detail-manage'
import ClientAppUninstallConfirmation from '@/components/ui/client-app-detail/client-app-uninstall-confirmation'
import { DesktopIntegrationTypeModel } from '@/actions/app-integration-types'
import { AppDetailDataNotNull } from '@/reducers/client/app-detail'
import { selectIntegrationTypes } from '@/selector/integration-types'
import { useSelector } from 'react-redux'
import { selectAppDetailData, selectAppDetailLoading } from '@/selector/client-app-detail'
import { selectLoginType, selectIsAdmin } from '@/selector/auth'
import AppHeader from '@/components/ui/app-detail/app-header'
import AppContent from './app-content'
import { Loader, Button } from '@reapit/elements'
import clientAppDetailStyles from '@/styles/pages/client-app-detail.scss?mod'
import ClientAppInstallConfirmation from '@/components/ui/client-app-detail/client-app-install-confirmation'

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
  const isLoadingAppDetail = useSelector(selectAppDetailLoading)
  const loginType = useSelector(selectLoginType)
  const isAdmin = useSelector(selectIsAdmin)
  const isInstallBtnHidden = loginType === 'CLIENT' && !isAdmin
  // selector selectAppDetailData return {} if not data
  const unfetched = Object.keys(appDetailData).length === 0
  const { id = '', installedOn = '' } = appDetailData

  if (isLoadingAppDetail || unfetched) {
    return <Loader dataTest="client-app-detail-loader" />
  }

  return (
    <div data-test="client-app-detail-container" className={clientAppDetailStyles.appDetailContainer}>
      <AppHeader
        appDetailData={appDetailData}
        buttonGroup={renderAppHeaderButtonGroup(
          id,
          installedOn,
          onUninstsallConfirmationModal,
          onInstallConfirmationModal,
          isInstallBtnHidden,
        )}
      />
      <AppContent desktopIntegrationTypes={desktopIntegrationTypes} appDetailData={appDetailData} />
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
  )
}

export default ClientAppDetail
