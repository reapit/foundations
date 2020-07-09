import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CallToAction from '@/components/ui/call-to-action'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, SubTitleH6, ModalProps } from '@reapit/elements'
import { developerSetStatusRequest, developerSetStatusSetInitFormState } from '@/actions/developer-set-status'
import { selectDeveloperSetStatusFormState } from '@/selector/developer-set-status'

export interface SetMemberStatusModalProps extends Pick<ModalProps, 'visible'> {
  developer?: DeveloperModel
  onCancel: () => void
  onSuccess: () => void
}

export const handleSetMemberStatus = (developer: DeveloperModel, dispatch) => () => {
  dispatch(developerSetStatusRequest({ ...developer, isInactive: !developer.isInactive }))
}

export const handleSetMemberStatusSuccess = (onSuccess, dispatch) => () => {
  dispatch(developerSetStatusSetInitFormState())
  onSuccess()
}

const SetMemberStatusModal: React.FC<SetMemberStatusModalProps> = ({ visible, developer, onCancel, onSuccess }) => {
  if (!developer) return null

  const dispatch = useDispatch()
  const formState = useSelector(selectDeveloperSetStatusFormState)
  const isLoading = Boolean(formState === 'SUBMITTING')
  const isSucceeded = Boolean(formState === 'SUCCESS')
  const { isInactive, name } = developer

  return (
    <Modal
      visible={visible}
      tapOutsideToDissmiss={false}
      renderChildren
      footerItems={
        <>
          <Button variant="secondary" loading={isLoading} type="button" onClick={onCancel}>
            CANCEL
          </Button>
          <Button
            variant="primary"
            loading={isLoading}
            type="button"
            onClick={handleSetMemberStatus(developer, dispatch)}
          >
            CONTINUE
          </Button>
        </>
      }
    >
      {isSucceeded ? (
        <CallToAction
          title="Success"
          buttonText="OK"
          onButtonClick={handleSetMemberStatusSuccess(onSuccess, dispatch)}
          isCenter
        >
          Member &lsquo;{name}&rsquo; has been {isInactive ? 'enabled' : 'disabled'} successfully.
        </CallToAction>
      ) : (
        <>
          <ModalHeader title={`${isInactive ? 'Enable' : 'Disable'} Member?`} />
          <ModalBody
            body={
              <SubTitleH6>
                Are you sure you want to {isInactive ? 'enable' : 'disable'} the account for member &lsquo;
                {name}&rsquo;?
              </SubTitleH6>
            }
          />
          <ModalFooter
            footerItems={
              <>
                <Button fullWidth disabled={isLoading} type="button" variant="secondary" onClick={onCancel}>
                  Cancel
                </Button>
                <Button
                  fullWidth
                  loading={isLoading}
                  type="button"
                  variant="primary"
                  onClick={handleSetMemberStatus(developer, dispatch)}
                >
                  Continue
                </Button>
              </>
            }
          />
        </>
      )}
    </Modal>
  )
}

export default SetMemberStatusModal
