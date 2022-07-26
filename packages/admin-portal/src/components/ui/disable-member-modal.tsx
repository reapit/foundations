import * as React from 'react'
import { useDispatch } from 'react-redux'
import CallToAction from '@/components/ui/call-to-action'
import { MemberModel } from '@reapit/foundations-ts-definitions'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, SubTitleH6, ModalProps } from '@reapit/elements-legacy'
import { disableMember } from '@/actions/devs-management'

export interface DisableMemberModalProps extends Pick<ModalProps, 'visible'> {
  member?: MemberModel
  onCancel: () => void
  onSuccess: () => void
}

export const handleDisableMember = (developerId: string, memberId: string, dispatch, setSuccess) => () => {
  dispatch(
    disableMember({
      developerId: developerId,
      memberId: memberId,
      callback: (isSuccess) => {
        setSuccess(isSuccess)
      },
    }),
  )
}

export const handleDisableMemberSuccess = (onSuccess, setSuccess) => () => {
  onSuccess()
  setSuccess(false)
}

const DisableMemberModal: React.FC<DisableMemberModalProps> = ({ visible, member, onCancel, onSuccess }) => {
  const [isSuccess, setSuccess] = React.useState(false)
  const dispatch = useDispatch()

  if (!member) return null

  const isLoading = false
  const developerId = member?.developerId || ''
  const { name } = member

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
            onClick={handleDisableMember(developerId, member?.id || '', dispatch, setSuccess)}
          >
            CONTINUE
          </Button>
        </>
      }
    >
      {isSuccess ? (
        <CallToAction
          title="Success"
          buttonText="OK"
          onButtonClick={handleDisableMemberSuccess(onSuccess, setSuccess)}
          isCenter
        >
          Member &lsquo;{name}&rsquo; has been disabled successfully.
        </CallToAction>
      ) : (
        <>
          <ModalHeader title="Disable Member?" />
          <ModalBody
            body={
              <SubTitleH6>
                Are you sure you want to disable the account for member &lsquo;
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
                  loading={isLoading as boolean}
                  type="button"
                  variant="primary"
                  onClick={handleDisableMember(developerId, member?.id || '', dispatch, setSuccess)}
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

export default DisableMemberModal
