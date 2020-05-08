import * as React from 'react'
import { useSelector } from 'react-redux'
import { selectAppDetailData, selectAppDetailLoading } from '@/selector/client-app-detail'
import { selectLoginType } from '@/selector/auth'
import AppHeader from '@/components/ui/app-detail/app-header'
import AppContent from '@/components/ui/app-detail/app-content'

import { Loader } from '@reapit/elements'
import styles from '@/styles/pages/developer-app-detail.scss?mod'
import ClientAppDetailButtonGroup from '@/components/ui/client-app-detail/client-app-detail-button-group'
import ClientAppInstallConfirmation from '@/components/ui/client-app-detail/client-app-install-confirmation'

export type ClientAppDetailProps = {}

export const handleCloseInstallConfirmationModal = (
  setIsVisibleInstallConfirmation: (isModalOpen: boolean) => void,
) => {
  return () => {
    setIsVisibleInstallConfirmation(false)
  }
}

export const handleInstallAppButtonClick = (setIsVisibleInstallConfirmation: (isModalOpen: boolean) => void) => {
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

  return (
    <div className={styles.appDetailContainer}>
      <AppHeader
        appDetailData={appDetailData}
        buttonGroup={
          appDetailData.id && (
            <ClientAppDetailButtonGroup
              appDetailData={appDetailData}
              handleInstallAppButtonClick={onInstallConfirmationModal}
            />
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
