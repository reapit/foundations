import * as React from 'react'
import { useSelector } from 'react-redux'
import { selectAppDetailData, selectAppDetailLoading } from '@/selector/client-app-detail'
import { selectLoginType } from '@/selector/auth'
import AppHeader from '@/components/ui/app-detail/app-header'
import AppContent from '@/components/ui/app-detail/app-content'

import { Loader, Button } from '@reapit/elements'
import styles from '@/styles/pages/developer-app-detail.scss?mod'
import ClientAppUninstallConfirmation from '@/components/ui/client-app-detail/client-app-uninstall-confirmation'

export type ClientAppDetailManageProps = {}

export const handleCloseUninstallConfirmationModal = (
  setIsVisibleUninstallConfirmation: (isModalOpen: boolean) => void,
) => {
  return () => {
    setIsVisibleUninstallConfirmation(false)
  }
}

export const handleUninstallAppButtonClick = (setIsVisibleUninstallConfirmation: (isModalOpen: boolean) => void) => {
  return () => {
    setIsVisibleUninstallConfirmation(true)
  }
}

const ClientAppDetailManage: React.FC<ClientAppDetailManageProps> = () => {
  const [isVisibleUninstallConfirmation, setIsVisibleUninstallConfirmation] = React.useState(false)
  const closeUninstallConfirmationModal = React.useCallback(
    handleCloseUninstallConfirmationModal(setIsVisibleUninstallConfirmation),
    [],
  )
  const onUninstallConfirmationModal = React.useCallback(
    handleUninstallAppButtonClick(setIsVisibleUninstallConfirmation),
    [],
  )

  const appDetailData = useSelector(selectAppDetailData)
  const isLoadingAppDetail = useSelector(selectAppDetailLoading)
  const loginType = useSelector(selectLoginType)

  const { installedOn } = appDetailData

  return (
    <div className={styles.appDetailContainer}>
      <AppHeader
        appDetailData={appDetailData}
        buttonGroup={
          installedOn && (
            <Button
              dataTest="detail-modal-uninstall-button"
              type="button"
              variant="primary"
              onClick={onUninstallConfirmationModal}
            >
              Uninstall App
            </Button>
          )
        }
      />
      <AppContent appDetailData={appDetailData} loginType={loginType} />
      <ClientAppUninstallConfirmation
        visible={isVisibleUninstallConfirmation}
        appDetailData={appDetailData}
        closeUninstallConfirmationModal={closeUninstallConfirmationModal}
      />
      {isLoadingAppDetail && <Loader />}
    </div>
  )
}

export default ClientAppDetailManage
