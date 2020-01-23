import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, SubTitleH6, ModalProps } from '@reapit/elements'
import CallToAction from '@/components/ui/call-to-action'
import { ReduxState, FormState } from '@/types/core'
import { developerSetStatusRequest, developerSetStatusSetInitFormState } from '@/actions/developer-set-status'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'

export interface SetDeveloperStatusModal {
  onSuccess: () => void
  developer: DeveloperModel
}

export interface SetDeveloperStatusMappedProps {
  formState: FormState
}
export interface SetDeveloperStatusMappedActions {
  developerSetStatusRequest: (developer: DeveloperModel) => void
  resetDeveloperSetStatusReducer: () => void
}

export type SetDeveloperStatusProps = Pick<ModalProps, 'visible' | 'afterClose'> &
  SetDeveloperStatusMappedProps &
  SetDeveloperStatusMappedActions &
  SetDeveloperStatusModal

export const SetDeveloperStatusModal = ({
  afterClose,
  visible,
  onSuccess,
  formState,
  developer,
  developerSetStatusRequest,
  resetDeveloperSetStatusReducer
}: SetDeveloperStatusProps) => {
  const isLoading = Boolean(formState === 'SUBMITTING')
  const isSucceeded = Boolean(formState === 'SUCCESS')
  const { isInactive, name } = developer
  return (
    <Modal visible={visible} afterClose={onAfterCloseHandler({ afterClose, isLoading })} renderChildren>
      <>
        {isSucceeded ? (
          <CallToAction
            title="Success"
            buttonText="Back to List"
            onButtonClick={onSuccessHandler({ onSuccess, resetDeveloperSetStatusReducer })}
            isCenter
          >
            Developer &lsquo;{name}&rsquo; has been {isInactive ? 'activated' : 'deactivated'} successfully.
          </CallToAction>
        ) : (
          <>
            <ModalHeader
              title={`Confirm ${name} ${isInactive ? 'Activation' : 'Deactivation'}`}
              afterClose={onAfterCloseHandler({ afterClose, isLoading })}
            />
            <ModalBody
              body={
                <SubTitleH6 isCentered>
                  Are you sure you want to {isInactive ? 'activate' : 'deactivate'} &lsquo;{name}&rsquo;?
                </SubTitleH6>
              }
            />
            <ModalFooter
              footerItems={
                <>
                  <Button
                    loading={isLoading}
                    type="button"
                    variant="danger"
                    onClick={() => developerSetStatusRequest({ ...developer, isInactive: !isInactive })}
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

export const onSuccessHandler = ({ onSuccess, resetDeveloperSetStatusReducer }) => () => {
  resetDeveloperSetStatusReducer()
  onSuccess()
}

export const mapStateToProps = (state: ReduxState): SetDeveloperStatusMappedProps => ({
  formState: state.developerSetStatus.formState
})

export const mapDispatchToProps = (dispatch: Dispatch): SetDeveloperStatusMappedActions => ({
  developerSetStatusRequest: (developer: DeveloperModel) => dispatch(developerSetStatusRequest(developer)),
  resetDeveloperSetStatusReducer: () => dispatch(developerSetStatusSetInitFormState())
})

export default connect(mapStateToProps, mapDispatchToProps)(SetDeveloperStatusModal)
