import * as React from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import { Button, Modal } from '@reapit/elements'
import { appInstallationsRequestInstall } from '@/actions/app-installations'
import { clientFetchAppDetail } from '@/actions/client'
import { Dispatch } from 'redux'
import CallToAction from '../call-to-action'
import { selectClientId } from '@/selector/client'
import { selectInstallationFormState } from '@/selector/installations'

export type ClientAppInstallConfirmationProps = {
  appDetailData?: AppDetailModel
  visible: boolean
  closeInstallConfirmationModal: () => void
}

export const handleInstallButtonClick = (
  appId: string,
  clientId: string,
  dispatch: Dispatch<any>,
  setIsSuccessAlertVisible: (isVisible: boolean) => void,
  closeInstallConfirmationModal: () => void,
) => {
  return () => {
    dispatch(
      appInstallationsRequestInstall({
        appId,
        callback: () => {
          dispatch(
            clientFetchAppDetail({
              id: appId,
              clientId,
            }),
          )
          closeInstallConfirmationModal()
          setIsSuccessAlertVisible(true)
        },
      }),
    )
  }
}

export const handleSuccessAlertButtonClick = history => {
  return () => {
    history.replace('/client/apps')
  }
}

export const handleSuccessAlertMessageAfterClose = (setIsSuccessAlertVisible: (isVisible: boolean) => void) => {
  return () => {
    setIsSuccessAlertVisible(false)
  }
}

const ClientAppInstallConfirmation: React.FC<ClientAppInstallConfirmationProps> = ({
  appDetailData,
  visible,
  closeInstallConfirmationModal,
}) => {
  const history = useHistory()
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = React.useState(false)
  const clientId = useSelector(selectClientId)
  const installationFormState = useSelector(selectInstallationFormState)
  const isSubmitting = installationFormState === 'SUBMITTING'

  const { name, id = '', scopes = [] } = appDetailData || {}

  const dispatch = useDispatch()
  const onSuccessAlertButtonClick = React.useCallback(handleSuccessAlertButtonClick(history), [history])

  return (
    <>
      <Modal
        visible={visible}
        title={`Confirm ${name} installation`}
        afterClose={closeInstallConfirmationModal}
        footerItems={
          <>
            <Button
              dataTest="agree-btn"
              loading={isSubmitting}
              className={appPermissionContentStyles.installButton}
              type="button"
              variant="primary"
              onClick={handleInstallButtonClick(
                id,
                clientId,
                dispatch,
                setIsSuccessAlertVisible,
                closeInstallConfirmationModal,
              )}
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
      <Modal visible={isSuccessAlertVisible} afterClose={handleSuccessAlertMessageAfterClose(setIsSuccessAlertVisible)}>
        <>
          <CallToAction
            title="Success"
            buttonText="Back to List"
            dataTest="installations-success-message"
            buttonDataTest="installations-success-button"
            onButtonClick={onSuccessAlertButtonClick}
            isCenter
          >
            {name} has been successfully installed
          </CallToAction>
        </>
      </Modal>
    </>
  )
}

export default ClientAppInstallConfirmation
