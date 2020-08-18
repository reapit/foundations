import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@reapit/elements'
import { setAsAdmin, SetAsAdminParams } from '@/actions/developers'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { MemberModel } from '@reapit/foundations-ts-definitions'
import { selectSetAsAdminLoading } from '@/selector/developers'
import SuccessModal from './success-modal'

export const handleSetAsAdmin = (dispatch: Dispatch, data: any, closeModal) => () => {
  const { developerId, id, name, jobTitle } = data
  const params: SetAsAdminParams = {
    id: developerId,
    memberId: id,
    name,
    jobTitle,
    role: 'user',
    callback: closeModal,
  }
  dispatch(setAsAdmin(params))
}

export const handleAfterSetAdmin = setIsSuccess => () => {
  setIsSuccess(true)
}

export interface SetAsAdminModalProps {
  visible: boolean
  user: MemberModel | null
  onClose?: () => void
}

export const SetAsAdminModal: React.FunctionComponent<SetAsAdminModalProps> = ({ visible, user, onClose }) => {
  if (!visible || !user) return null

  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const dispatch = useDispatch()

  const { name } = user

  const onSuccess = handleAfterSetAdmin(setIsSuccess)
  const onSetAsAdmin = handleSetAsAdmin(dispatch, user, onSuccess)

  const loading = useSelector(selectSetAsAdminLoading)

  if (isSuccess) return <SuccessModal name={name} onClose={onClose} />
  return (
    <Modal visible renderChildren afterClose={onClose}>
      <>
        <ModalHeader title="Set as Admin"></ModalHeader>
        <ModalBody
          body={
            <>
              <p>
                By setting ‘<strong>{name}</strong>‘ as an Admin you are granting full permission to your organisation.
                Members of the Admin group will also have access to User Management, Billing and can create and manage
                subscriptions.
              </p>
              <br />
              <p>
                Are you sure you want to set ‘<strong>{name}</strong>‘ as an Admin?
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
              <Button variant="primary" fullWidth onClick={onSetAsAdmin} loading={loading}>
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
