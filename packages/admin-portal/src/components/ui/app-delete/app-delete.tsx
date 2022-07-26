import * as React from 'react'
import { setDeleteAppInitFormState, requestDeleteApp } from '@/actions/app-delete'
import { useDispatch, useSelector } from 'react-redux'
import { Button, ModalProps, Modal, ModalBody, ModalHeader, ModalFooter } from '@reapit/elements-legacy'
import CallToAction from '../call-to-action'
import { selectAppDeleteFormState } from '@/selector/app-delete'
import { Dispatch } from 'redux'
import { commonButton } from './__styles__'

export type AppDeleteProps = Pick<ModalProps, 'visible' | 'afterClose'> & {
  appId: string
  appName: string
  closeModal?: () => void
  onDeleteSuccess: () => void
}

export const handleAfterClose =
  ({ isSuccedded, onDeleteSuccess, isLoading, afterClose }) =>
  () => {
    if (isSuccedded) {
      onDeleteSuccess()
    } else if (!isLoading && afterClose) {
      afterClose()
    }
  }

export const onDeleteButtonClick = (appId: string, dispatch: Dispatch) => {
  return () => {
    dispatch(requestDeleteApp(appId))
  }
}

export const handleUseEffect = (dispatch: Dispatch) => () => {
  dispatch(setDeleteAppInitFormState())
}

export const DeleteAppModal: React.FC<AppDeleteProps> = ({ appId, appName, afterClose, visible, onDeleteSuccess }) => {
  const dispatch = useDispatch()
  React.useEffect(handleUseEffect(dispatch), [])
  const formState = useSelector(selectAppDeleteFormState)

  const isLoading = formState === 'SUBMITTING'
  const isSuccedded = formState === 'SUCCESS'

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
                    className={commonButton}
                    type="button"
                    variant="danger"
                    onClick={onDeleteButtonClick(appId, dispatch)}
                  >
                    Delete
                  </Button>
                  <Button
                    dataTest="disagree-btn"
                    disabled={Boolean(isLoading)}
                    className={commonButton}
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
