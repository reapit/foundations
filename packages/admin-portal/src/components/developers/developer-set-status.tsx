import * as React from 'react'
import { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, SubTitleH6, ModalProps } from '@reapit/elements'
import CallToAction from '@/components/ui/call-to-action'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'

export type SetDeveloperStatusProps = Pick<ModalProps, 'visible' | 'afterClose'> & {
  onSuccess: () => void
  developer: DeveloperModel
}

export const onAfterCloseHandler = (isLoading: boolean, afterClose?: () => void) => {
  return () => {
    if (!isLoading && afterClose) {
      afterClose()
    }
  }
}

export const onSuccessHandler = (onSuccess: () => void, dispatch: Dispatch) => {
  return () => {
    dispatch(initRequestDeveloperStatusFormState())
    onSuccess()
  }
}

export const onConfirmButtonClick = (developer: DeveloperModel, dispatch: Dispatch, isInactive?: boolean) => {
  return () => {
    dispatch(setRequestDeveloperStatusFormState({ ...developer, isInactive: !isInactive }))
  }
}

export const SetDeveloperStatusModal: React.FC<SetDeveloperStatusProps> = ({
  afterClose,
  visible,
  onSuccess,
  developer,
}) => {
  const dispatch = useDispatch()
  const formState = useSelector(selectDeveloperSetStatusFormState)
  const isLoading = Boolean(formState === 'SUBMITTING')
  const isSucceeded = Boolean(formState === 'SUCCESS')
  const { isInactive, name } = developer

  return (
    <Modal visible={visible} afterClose={onAfterCloseHandler(isLoading, afterClose)} renderChildren>
      <>
        {isSucceeded ? (
          <CallToAction
            title="Success"
            buttonText="Back to List"
            onButtonClick={onSuccessHandler(onSuccess, dispatch)}
            isCenter
          >
            Developer &lsquo;{name}&rsquo; has been {isInactive ? 'activated' : 'deactivated'} successfully.
          </CallToAction>
        ) : (
          <>
            <ModalHeader
              title={`Confirm ${name} ${isInactive ? 'Activation' : 'Deactivation'}`}
              afterClose={onAfterCloseHandler(isLoading, afterClose)}
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
                    onClick={onConfirmButtonClick(developer, dispatch, isInactive)}
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

export default SetDeveloperStatusModal
