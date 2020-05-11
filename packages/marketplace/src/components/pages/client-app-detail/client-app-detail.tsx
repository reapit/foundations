import * as React from 'react'
import { FaCheck } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { selectAppDetailData, selectAppDetailLoading } from '@/selector/client-app-detail'
import { selectLoginType } from '@/selector/auth'
import AppHeader from '@/components/ui/app-detail/app-header'
import AppContent from '@/components/ui/app-detail/app-content'

import { Loader, Button } from '@reapit/elements'
import styles from '@/styles/pages/developer-app-detail.scss?mod'
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

const ClientAppDetail: React.FC<ClientAppDetailProps> = () => {
  const [isVisibleInstallConfirmation, setIsVisibleInstallConfirmation] = React.useState(false)
  const closeInstallConfirmationModal = React.useCallback(
    handleCloseInstallConfirmationModal(setIsVisibleInstallConfirmation),
    [],
  )
  const onInstallConfirmationModal = React.useCallback(handleInstallAppButtonClick(setIsVisibleInstallConfirmation), [])

  const appDetailData = useSelector(selectAppDetailData)
  const isLoadingAppDetail = useSelector(selectAppDetailLoading)
  const loginType = useSelector(selectLoginType)

  const { id, installedOn } = appDetailData

  return (
    <div className={styles.appDetailContainer}>
      <AppHeader
        appDetailData={appDetailData}
        buttonGroup={
          id && (
            <div>
              {installedOn ? (
                <div data-test="detail-modal-installed" className={styles.installed}>
                  <FaCheck />
                  <span>Installed</span>
                </div>
              ) : (
                <Button
                  dataTest="detail-modal-install-button"
                  type="button"
                  variant="primary"
                  onClick={onInstallConfirmationModal}
                >
                  Install App
                </Button>
              )}
            </div>
          )
        }
      />
      <AppContent appDetailData={appDetailData} loginType={loginType} />
      <ClientAppInstallConfirmation
        visible={isVisibleInstallConfirmation}
        appDetailData={appDetailData}
        closeInstallConfirmationModal={closeInstallConfirmationModal}
      />
      {isLoadingAppDetail && <Loader />}
    </div>
  )
}

export default ClientAppDetail
