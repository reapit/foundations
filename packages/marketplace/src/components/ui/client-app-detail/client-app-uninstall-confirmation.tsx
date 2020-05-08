import * as React from 'react'
import { useHistory } from 'react-router'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import { Button, Modal } from '@reapit/elements'
import { clientAppDetailRequestData } from '@/actions/client'
import { appInstallationsRequestUninstall } from '@/actions/app-installations'
import CallToAction from '../call-to-action'
import { selectClientId } from '@/selector/client'
import { selectInstallationFormState } from '@/selector/installations'

export type ClientAppUninstallConfirmationProps = {
  appDetailData?: AppDetailModel
  visible: boolean
  closeUninstallConfirmationModal: () => void
}

export const onUninstallButtonClick = (
  appId: string,
  clientId: string,
  installationId: string,
  dispatch: Dispatch<any>,
  setIsSuccessAlertVisible: (isVisible: boolean) => void,
  closeUninstallConfirmationModal: () => void,
) => {
  return () => {
    dispatch(
      appInstallationsRequestUninstall({
        appId,
        installationId,
        terminatedReason: 'User uninstall',
        callback: () => {
          dispatch(
            clientAppDetailRequestData({
              id: appId,
              clientId,
            }),
          )
          closeUninstallConfirmationModal()
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

const ClientAppUninstallConfirmation: React.FC<ClientAppUninstallConfirmationProps> = ({
  appDetailData,
  visible,
  closeUninstallConfirmationModal,
}) => {
  const [isSuccessAlertVisible, setIsSuccessAlertVisible] = React.useState(false)
  const history = useHistory()
  const clientId = useSelector(selectClientId)
  const installationFormState = useSelector(selectInstallationFormState)
  const isSubmitting = installationFormState === 'SUBMITTING'
  const { name, id = '', installationId = '' } = appDetailData || {}
  const dispatch = useDispatch()
  const onSuccessAlertButtonClick = React.useCallback(handleSuccessAlertButtonClick(history), [history])

  return (
    <>
      <Modal
        visible={visible}
        title={`Confirm ${name} installation`}
        afterClose={closeUninstallConfirmationModal}
        footerItems={
          <>
            <Button
              dataTest="agree-btn"
              loading={isSubmitting}
              className={appPermissionContentStyles.installButton}
              type="button"
              variant="primary"
              onClick={onUninstallButtonClick(
                id,
                clientId,
                installationId,
                dispatch,
                setIsSuccessAlertVisible,
                closeUninstallConfirmationModal,
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
              onClick={closeUninstallConfirmationModal}
            >
              Cancel
            </Button>
          </>
        }
      >
        <>Are you sure you wish to uninstall {name}? This action will uninstall the app for ALL platform users</>
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
            {name} has been successfully uninstalled
          </CallToAction>
        </>
      </Modal>
    </>
  )
}

export default ClientAppUninstallConfirmation
