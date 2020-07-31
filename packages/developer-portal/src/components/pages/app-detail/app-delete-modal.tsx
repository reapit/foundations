import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ModalProps, Modal, ModalBody, ModalHeader, ModalFooter } from '@reapit/elements'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import CallToAction from '../../ui/call-to-action'
import { Dispatch } from 'redux'
import { deleteApp } from '@/actions/apps'
import { selectDeleteAppLoading } from '@/selector/apps/delete-app'

export type AppDeleteProps = Pick<ModalProps, 'visible' | 'afterClose'> & {
  appId: string
  appName: string
  closeModal?: () => void
  onDeleteSuccess: () => void
}

export const handleAfterClose = ({ isSuccedded, onDeleteSuccess, isLoading, afterClose }) => () => {
  if (isSuccedded) {
    onDeleteSuccess()
  } else if (!isLoading && afterClose) {
    afterClose()
  }
}

export const handleDeleteAppSuccessCallback = (setIsSuccedded: React.Dispatch<React.SetStateAction<boolean>>) => {
  return () => {
    setIsSuccedded(true)
  }
}

export const onDeleteButtonClick = (
  appId: string,
  dispatch: Dispatch,
  setIsSuccedded: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return () => {
    dispatch(
      deleteApp({
        id: appId,
        successCallback: handleDeleteAppSuccessCallback(setIsSuccedded),
      }),
    )
  }
}

export const DeleteAppModal: React.FC<AppDeleteProps> = ({ appId, appName, afterClose, visible, onDeleteSuccess }) => {
  const dispatch = useDispatch()
  const [isSuccedded, setIsSuccedded] = React.useState(false)
  const isLoading = useSelector(selectDeleteAppLoading)

  return (
    <Modal
      visible={visible}
      afterClose={handleAfterClose({ isSuccedded, onDeleteSuccess, isLoading, afterClose })}
      renderChildren
    >
      <React.Fragment>
        {isSuccedded ? (
          <CallToAction
            title="Deleted"
            buttonText="Back to List"
            dataTest="delete-app-success-message"
            buttonDataTest="delete-app-success-button"
            onButtonClick={onDeleteSuccess}
            isCenter
          >
            We have successfully deleted app &lsquo;{appName}&rsquo;.
          </CallToAction>
        ) : (
          <React.Fragment>
            <ModalHeader
              title={`Confirm ${appName} deletion`}
              afterClose={afterClose as () => void}
              data-test="confirm-content"
            />
            <ModalBody
              body={
                <React.Fragment>
                  Are you sure you want to remove this App &lsquo;{appName}&rsquo;. By clicking &lsquo;Delete&rsquo; it
                  will remove the App and all its data, including all revisions and listings. Please click
                  &lsquo;Delete&rsquo; to continue with deletion.
                </React.Fragment>
              }
            />
            <ModalFooter
              footerItems={
                <React.Fragment>
                  <Button
                    dataTest="agree-btn"
                    loading={Boolean(isLoading)}
                    className={appPermissionContentStyles.installButton}
                    type="button"
                    variant="danger"
                    onClick={onDeleteButtonClick(appId, dispatch, setIsSuccedded)}
                  >
                    Delete
                  </Button>
                  <Button
                    dataTest="disagree-btn"
                    disabled={Boolean(isLoading)}
                    className={appPermissionContentStyles.installButton}
                    type="button"
                    variant="secondary"
                    onClick={afterClose}
                  >
                    Cancel
                  </Button>
                </React.Fragment>
              }
            />
          </React.Fragment>
        )}
      </React.Fragment>
    </Modal>
  )
}

export default DeleteAppModal
