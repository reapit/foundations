import * as React from 'react'
import { useDispatch } from 'react-redux'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import { Button, Modal } from '@reapit/elements'
import { appInstallationsRequestUninstall } from '@/actions/app-installations'
import { Dispatch } from 'redux'

export type ClientAppUninstallConfirmationProps = {
  appDetailData?: AppDetailModel
  visible: boolean
  closeInstallConfirmationModal: () => void
}

export const onInstallButtonClick = (appId: string, dispatch: Dispatch<any>) => {
  return () => {
    dispatch(
      appInstallationsRequestUninstall({
        appId,
      }),
    )
  }
}

const ClientAppUninstallConfirmation: React.FC<ClientAppUninstallConfirmationProps> = ({
  appDetailData,
  visible,
  closeInstallConfirmationModal,
}) => {
  const { name, id = '', scopes = [] } = appDetailData || {}
  const dispatch = useDispatch()

  return (
    <Modal
      visible={visible}
      title={`Confirm ${name} installation`}
      afterClose={closeInstallConfirmationModal}
      footerItems={
        <>
          <Button
            dataTest="agree-btn"
            loading={false}
            className={appPermissionContentStyles.installButton}
            type="button"
            variant="primary"
            onClick={onInstallButtonClick(id, dispatch)}
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
      <>Are you sure you wish to uninstall {name}? This action will uninstall the app for ALL platform users</>
    </Modal>
  )
}

export default ClientAppUninstallConfirmation
