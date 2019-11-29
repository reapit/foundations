import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, SubTitleH6, ModalProps } from '@reapit/elements'
import CallToAction from '@/components/ui/call-to-action'
import { ReduxState, FormState } from '@/types/core'
import { developerDeleteRequest, developerDeleteSetInitFormState } from '@/actions/developer-delete'

export interface DeveloperDeleteModal {
  onDeleteSuccess: () => void
  developerName: string
  developerId: string
}

export interface DeveloperDeleteMappedProps {
  formState: FormState
}
export interface DeveloperDeleteMappedActions {
  developerDeleteRequest: (developerId: string) => void
  resetDeveloperDeleteReducer: () => void
}

export type DeveloperDeleteProps = Pick<ModalProps, 'visible' | 'afterClose'> &
  DeveloperDeleteMappedProps &
  DeveloperDeleteMappedActions &
  DeveloperDeleteModal

export const DeleteDeveloperModal = ({
  afterClose,
  visible,
  onDeleteSuccess,
  formState,
  developerName,
  developerId,
  developerDeleteRequest,
  resetDeveloperDeleteReducer
}: DeveloperDeleteProps) => {
  const isLoading = Boolean(formState === 'SUBMITTING')
  const isSucceeded = Boolean(formState === 'SUCCESS')

  return (
    <Modal visible={visible} afterClose={onAfterCloseHandler({ afterClose, isLoading })} renderChildren>
      <>
        {isSucceeded ? (
          <ModalBody
            body={
              <CallToAction
                title="Removed!"
                buttonText="Back to List"
                onButtonClick={onDeleteSuccessHandler({ onDeleteSuccess, resetDeveloperDeleteReducer })}
                isCenter
              >
                Developer '{developerName}' has been deleted successfully.
              </CallToAction>
            }
          />
        ) : (
          <>
            <ModalHeader
              title={`Confirm ${developerName} deletion`}
              afterClose={onAfterCloseHandler({ afterClose, isLoading })}
            />
            <ModalBody body={<SubTitleH6 isCentered>Are you sure you want to delete '{developerName}'?</SubTitleH6>} />
            <ModalFooter
              footerItems={
                <>
                  <Button
                    loading={isLoading}
                    type="button"
                    variant="danger"
                    onClick={() => developerDeleteRequest(developerId)}
                  >
                    Confirm
                  </Button>
                  <Button disabled={isLoading} type="button" variant="secondary" onClick={afterClose}>
                    Cancel
                  </Button>
                </>
              }
            />
          </>
        )}
      </>
    </Modal>
  )
}

export const onAfterCloseHandler = ({ afterClose, isLoading }) => () => {
  if (!isLoading && afterClose) {
    afterClose()
    return
  }
}

export const onDeleteSuccessHandler = ({ onDeleteSuccess, resetDeveloperDeleteReducer }) => () => {
  resetDeveloperDeleteReducer()
  onDeleteSuccess()
}

export const mapStateToProps = (state: ReduxState): DeveloperDeleteMappedProps => ({
  formState: state.developerDelete.formState
})

export const mapDispatchToProps = (dispatch: Dispatch): DeveloperDeleteMappedActions => ({
  developerDeleteRequest: (developerId: string) => dispatch(developerDeleteRequest(developerId)),
  resetDeveloperDeleteReducer: () => dispatch(developerDeleteSetInitFormState())
})

export default connect(mapStateToProps, mapDispatchToProps)(DeleteDeveloperModal)
