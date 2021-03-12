import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CallToAction from '@/components/ui/call-to-action'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, ModalProps } from '@reapit/elements'
import { disableMember } from '@/actions/developers'
import { selectDisableMemberLoading } from '@/selector/developers'
import { selectCurrentMemberData } from '@/selector/current-member'
import { ButtonGroup } from '../../../../elements/src/components/Button/index'

export interface DisableMemberModalProps extends Pick<ModalProps, 'visible'> {
  developer?: DeveloperModel
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

const DisableMemberModal: React.FC<DisableMemberModalProps> = ({ visible, developer, onCancel, onSuccess }) => {
  if (!developer) return null
  const [isSuccess, setSuccess] = React.useState(false)
  const dispatch = useDispatch()
  const isLoading = useSelector(selectDisableMemberLoading)
  const currentUser = useSelector(selectCurrentMemberData)
  const developerId = currentUser?.developerId || ''
  const { name } = developer

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
            onClick={handleDisableMember(developerId, developer?.id || '', dispatch, setSuccess)}
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
              <>
                Are you sure you want to disable the account for member &lsquo;
                {name}&rsquo;?
              </>
            }
          />
          <ModalFooter
            footerItems={
              <ButtonGroup hasSpacing isCentered>
                <Button disabled={isLoading} type="button" variant="secondary" onClick={onCancel}>
                  Cancel
                </Button>
                <Button
                  loading={isLoading}
                  type="button"
                  variant="primary"
                  onClick={handleDisableMember(developerId, developer?.id || '', dispatch, setSuccess)}
                >
                  Continue
                </Button>
              </ButtonGroup>
            }
          />
        </>
      )}
    </Modal>
  )
}

export default DisableMemberModal
