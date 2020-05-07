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
  closeUninstallConfirmationModal: () => void
}

export const onUninstallButtonClick = (appId: string, installationId: string, dispatch: Dispatch<any>) => {
  return () => {
    dispatch(
      appInstallationsRequestUninstall({
        appId,
        installationId,
        terminatedReason: 'User uninstall',
      }),
    )
  }
}

const ClientAppUninstallConfirmation: React.FC<ClientAppUninstallConfirmationProps> = ({
  appDetailData,
  visible,
  closeUninstallConfirmationModal,
}) => {
  const { name, id = '', installationId = '' } = appDetailData || {}
  const dispatch = useDispatch()

  return (
    <Modal
      visible={visible}
      title={`Confirm ${name} installation`}
      afterClose={closeUninstallConfirmationModal}
      footerItems={
        <>
          <Button
            dataTest="agree-btn"
            loading={false}
            className={appPermissionContentStyles.installButton}
            type="button"
            variant="primary"
            onClick={onUninstallButtonClick(id, installationId, dispatch)}
          >
            Confirm
          </Button>
          <Button
            dataTest="disagree-btn"
            disabled={false}
            className={appPermissionContentStyles.installButton}
            type="button"
            variant="danger"
            onClick={closeUninstallConfirmationModal}
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
