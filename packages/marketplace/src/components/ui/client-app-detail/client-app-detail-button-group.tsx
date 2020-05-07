import * as React from 'react'
import { FaCheck } from 'react-icons/fa'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/pages/developer-app-detail.scss?mod'
import { Button } from '@reapit/elements'
import ClientAppInstallConfirmation from './client-app-install-confirmation'

export type ClientAppDetailButtonGroupProps = {
  appDetailData: AppDetailModel & {
    apiKey?: string | undefined
  }
}

export const handleCloseInstallConfirmationModal = (
  setIsVisibleInstallConfirmation: (isModalOpen: boolean) => void,
) => {
  return () => {
    setIsVisibleInstallConfirmation(false)
  }
}

const ClientAppDetailButtonGroup: React.FC<ClientAppDetailButtonGroupProps> = ({ appDetailData }) => {
  const { installedOn } = appDetailData
  const [isVisibleInstallConfirmation, setIsVisibleInstallConfirmation] = React.useState(false)
  const closeInstallConfirmationModal = React.useCallback(
    handleCloseInstallConfirmationModal(setIsVisibleInstallConfirmation),
    [],
  )
  return (
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
          onClick={() => setIsVisibleInstallConfirmation(true)}
        >
          Install App
        </Button>
      )}
      <ClientAppInstallConfirmation
        visible={isVisibleInstallConfirmation}
        appDetailData={appDetailData}
        closeInstallConfirmationModal={closeInstallConfirmationModal}
      />
    </div>
  )
}

export default ClientAppDetailButtonGroup
