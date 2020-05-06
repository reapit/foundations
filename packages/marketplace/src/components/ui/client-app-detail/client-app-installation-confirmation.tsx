import * as React from 'react'
import { useDispatch } from 'react-redux'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import { Button, Modal } from '@reapit/elements'
import { appInstallationsRequestInstall } from '@/actions/app-installations'
import { Dispatch } from 'redux'

export type ClientAppInstallationConfirmationProps = {
  appDetailData?: AppDetailModel
  visible: boolean
  closeInstallConfirmationModal: () => void
}

export const onInstallButtonClick = (appId: string, dispatch: Dispatch<any>) => {
  return () => {
    dispatch(
      appInstallationsRequestInstall({
        appId,
      }),
    )
  }
}

const ClientAppInstallationConfirmation: React.FC<ClientAppInstallationConfirmationProps> = ({
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
      <>
        {scopes.length ? (
          <div>
            <p>
              This action will install the app for ALL platform users.
              <br />
              {name} requires the permissions below. By installing you are granting permission to your data.
            </p>
            <ul className={appPermissionContentStyles.permissionList}>
              {scopes.map(({ description, name }) => (
                <li key={name} className={appPermissionContentStyles.permissionListItem}>
                  {description}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>This action will install the app for ALL platform users.</p>
        )}
      </>
    </Modal>
  )
}

export default ClientAppInstallationConfirmation
