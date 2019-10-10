import * as React from 'react'
import { oc } from 'ts-optchain'
import { connect } from 'react-redux'
import { FormState } from '../../types/core'
import { appDeleteRequest } from '@/actions/app-delete'
import { ReduxState } from '@/types/core'
import { Button, ModalProps, Modal, ModalBody, ModalHeader, ModalFooter, SubTitleH6 } from '@reapit/elements'
import appPermissionContentStyles from '@/styles/pages/app-permission-content.scss?mod'
import appDeleteStyles from '@/styles/pages/app-delete.scss?mod'
import CallToAction from './call-to-action'

interface AppDeleteModalWithConnectOwnProps {
  closeModal?: () => void
  onDeleteSuccess: () => void
}

export interface AppDeleteMappedProps extends AppDeleteModalWithConnectOwnProps {
  formState: FormState
  appName: string
}
export interface AppDeleteMappedActions {
  appDeleteRequest: () => void
}

export type AppDeleteProps = Pick<ModalProps, 'visible' | 'afterClose'> & AppDeleteMappedActions & AppDeleteMappedProps

const mapStateToProps = (state: ReduxState, ownProps: AppDeleteModalWithConnectOwnProps): AppDeleteMappedProps => ({
  formState: state.appDelete.formState,
  appName: oc(state.appDetail.appDetailData).data.name(''),
  onDeleteSuccess: ownProps.onDeleteSuccess
})

const mapDispatchToProps = (dispatch: any): AppDeleteMappedActions => ({
  appDeleteRequest: () => dispatch(appDeleteRequest())
})

const DeleteAppModal = ({
  appName,
  formState,
  afterClose,
  visible,
  appDeleteRequest,
  onDeleteSuccess
}: AppDeleteProps) => {
  const isLoading = formState === 'SUBMITTING'
  const isSuccedded = formState === 'SUCCESS'

  return (
    <Modal
      visible={visible}
      afterClose={() => {
        if (isSuccedded) {
          onDeleteSuccess()
        } else if (!isLoading && afterClose) {
          afterClose()
        }
      }}
      renderChildren
    >
      <div>
        {isSuccedded ? (
          <ModalBody
            body={
              <CallToAction
                title="Removed!"
                buttonText="Back to List"
                dataTest="delete-app-success-message"
                buttonDataTest="delete-app-success-button"
                onButtonClick={onDeleteSuccess}
                isCenter
              >
                App '{appName}' has been deleted successfully.
              </CallToAction>
            }
          />
        ) : (
          <div data-test="confirm-content">
            <ModalHeader title={`Confirm ${appName} deletion`} afterClose={afterClose as () => void} />
            <ModalBody
              body={
                <SubTitleH6 isCentered>
                  Are you sure you want to remove this App '{appName}'. By clicking 'Confirm' it will remove the App and
                  all its data, including all revisions and listings. Please click 'Confirm' to continue with deletion.
                </SubTitleH6>
              }
            />
            <ModalFooter
              footerItems={
                <>
                  <Button
                    dataTest="agree-btn"
                    loading={Boolean(isLoading)}
                    className={appPermissionContentStyles.installButton}
                    type="button"
                    variant="danger"
                    onClick={appDeleteRequest}
                  >
                    Confirm
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
                </>
              }
            />
          </div>
        )}
      </div>
    </Modal>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteAppModal)
