import * as React from 'react'
import { ModalProps, Modal } from '@reapit/elements'
import { InstallationModel } from '@reapit/foundations-ts-definitions'
import Installations from './installations'
import ConfirmUninstall from './confirm-uninstall'

interface AppInstallationsModalInnerProps {
  appId: string
  appName: string
  onUninstallSuccess: () => void
}

export type AppInstallationsModalProps = Pick<ModalProps, 'visible' | 'afterClose'> & AppInstallationsModalInnerProps

export const handleAfterClose = ({ setUninstallApp, afterClose }) => () => {
  setUninstallApp(undefined)
  afterClose()
}

export const handleUninstall = (setUninstallApp: (app: InstallationModel) => void) => (
  app: InstallationModel,
) => () => {
  setUninstallApp(app)
}

export const AppInstallationsModal: React.FC<AppInstallationsModalProps> = ({
  appId,
  appName,
  visible,
  afterClose,
  onUninstallSuccess,
}) => {
  const [uninstallApp, setUninstallApp] = React.useState<InstallationModel>()

  return (
    <Modal visible={visible} afterClose={afterClose} renderChildren>
      <>
        {uninstallApp ? (
          <ConfirmUninstall
            appName={appName}
            installationDetail={uninstallApp}
            onUninstallSuccess={onUninstallSuccess}
            afterClose={handleAfterClose({ setUninstallApp, afterClose })}
          />
        ) : (
          <Installations
            appId={appId}
            afterClose={handleAfterClose({ setUninstallApp, afterClose })}
            onUninstall={handleUninstall(setUninstallApp)}
          />
        )}
      </>
    </Modal>
  )
}

export default AppInstallationsModal
