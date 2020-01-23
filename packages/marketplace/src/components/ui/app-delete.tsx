import * as React from 'react'
import { FormState } from '../../types/core'
import { appDeleteRequest } from '@/actions/app-delete'
import { ReduxState } from '@/types/core'
import { Button, ModalProps, Modal, ModalBody, ModalHeader, ModalFooter } from '@reapit/elements'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import CallToAction from './call-to-action'
import { connect } from 'react-redux'

interface AppDeleteModalWithConnectOwnProps {
  appId: string
  appName: string
  closeModal?: () => void
  onDeleteSuccess: () => void
}

export interface AppDeleteMappedProps extends AppDeleteModalWithConnectOwnProps {
  formState: FormState
}
export interface AppDeleteMappedActions {
  appDeleteRequest: (appId: string) => void
}

export type AppDeleteProps = Pick<ModalProps, 'visible' | 'afterClose'> & AppDeleteMappedActions & AppDeleteMappedProps

export const mapStateToProps = (
  state: ReduxState,
  ownProps: AppDeleteModalWithConnectOwnProps,
): AppDeleteMappedProps => ({
  formState: state.appDelete.formState,
  appId: ownProps.appId,
  appName: ownProps.appName,
  onDeleteSuccess: ownProps.onDeleteSuccess,
})

export const mapDispatchToProps = (dispatch: any): AppDeleteMappedActions => ({
  appDeleteRequest: (appId: string) => dispatch(appDeleteRequest(appId)),
})

export const handleAfterClose = ({ isSuccedded, onDeleteSuccess, isLoading, afterClose }) => () => {
  if (isSuccedded) {
    onDeleteSuccess()
  } else if (!isLoading && afterClose) {
    afterClose()
  }
}

export const DeleteAppModal = ({
  appId,
  appName,
  formState,
  afterClose,
  visible,
  appDeleteRequest,
  onDeleteSuccess,
}: AppDeleteProps) => {
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
                    className={appPermissionContentStyles.installButton}
                    type="button"
                    variant="danger"
                    onClick={() => appDeleteRequest(appId)}
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

const AppDeleteModalWithRedux = connect(mapStateToProps, mapDispatchToProps)(DeleteAppModal)

AppDeleteModalWithRedux.displayName = 'AppDeleteModalWithRedux'

export default AppDeleteModalWithRedux
