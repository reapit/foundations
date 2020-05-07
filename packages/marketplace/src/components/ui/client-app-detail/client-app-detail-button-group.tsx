import * as React from 'react'
import { FaCheck } from 'react-icons/fa'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/pages/developer-app-detail.scss?mod'
import { Button } from '@reapit/elements'

export type ClientAppDetailButtonGroupProps = {
  appDetailData: AppDetailModel & {
    apiKey?: string | undefined
  }
  handleInstallAppButtonClick: () => void
}

const ClientAppDetailButtonGroup: React.FC<ClientAppDetailButtonGroupProps> = ({
  appDetailData,
  handleInstallAppButtonClick,
}) => {
  const { installedOn } = appDetailData

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
          onClick={handleInstallAppButtonClick}
        >
          Install App
        </Button>
      )}
    </div>
  )
}

export default ClientAppDetailButtonGroup
