import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@reapit/elements'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { MemberModel } from '@reapit/foundations-ts-definitions'
import SuccessModal from './success-modal'

export const handleSetAsAdmin = (dispatch: Dispatch, data: any, closeModal) => () => {
  const { developerId, id, name, jobTitle, role } = data
  const params: SetAsAdminParams = {
    id: developerId,
    memberId: id,
    name,
    jobTitle,
    role: role === 'admin' ? 'user' : 'admin',
    callback: closeModal,
  }
  dispatch(setAsAdmin(params))
}

export const handleAfterSetAdmin = (setIsSuccess) => () => {
  setIsSuccess(true)
}

export interface SetAsAdminModalProps {
  visible: boolean
  user: MemberModel | null
  onClose?: () => void
}

export const SetAsAdminModal: React.FunctionComponent<SetAsAdminModalProps> = ({ visible, user, onClose }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const dispatch = useDispatch()

  if (!visible || !user) return null

  const { name } = user

  const onSuccess = handleAfterSetAdmin(setIsSuccess)
  const onSetAsAdmin = handleSetAsAdmin(dispatch, user, onSuccess)
  const isAdmin = user.role === 'admin'

  const loading = false

  if (isSuccess) return <SuccessModal name={name} onClose={onClose} />
  return (
    <Modal visible renderChildren afterClose={onClose}>
      <>
        <ModalHeader title={isAdmin ? 'Unset as Admin' : 'Set as Admin'}></ModalHeader>
        <ModalBody
          body={
            <>
              <p>
                {isAdmin
                  ? `By unsetting ‘${name}‘ as an Admin you are removing their acccess to User Management, Billing and can create and manage
                  subscriptions.`
                  : `By setting ‘${name}‘ as an Admin you are granting full permission to this organisation.
                    Members of the Admin group will also have access to User Management, Billing and can create and manage
                    subscriptions.`}
              </p>
              <br />
              <p>
                Are you sure you want to {isAdmin ? 'unset' : 'set'} ‘<strong>{name}</strong>‘ as an Admin?
              </p>
            </>
          }
        />
        <ModalFooter
          footerItems={
            <>
              <Button variant="secondary" fullWidth onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" fullWidth onClick={onSetAsAdmin} loading={loading as boolean}>
                Continue
              </Button>
            </>
          }
        />
      </>
    </Modal>
  )
}

export default SetAsAdminModal
