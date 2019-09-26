import React from 'react'
import { Modal } from '@reapit/elements'
import Profile, { combineName } from './profile'
import Report from './report'
import AddressInformation from './address-information'
import { ContactModel } from '@/types/contact-api-schema'

export type ProfileModalProps = {
  contact: ContactModel
  isSubmitting: boolean
  modalContentType: string
  visible: boolean
  afterClose: () => void
}

export const renderContent = ({ modalContentType, contact, isSubmitting }) => {
  switch (modalContentType) {
    case 'PROFILE':
      return <Profile contact={contact} isSubmitting={isSubmitting} />
    case 'ADDRESS_HISTORY':
      return <AddressInformation contact={contact} loading={isSubmitting} />
    case 'REPORT':
      return <Report contact={contact} />
    default:
      return null
  }
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  contact,
  visible,
  afterClose,
  isSubmitting,
  modalContentType = 'PROFILE'
}) => {
  return (
    <Modal title={combineName(contact)} visible={visible} size="medium" afterClose={afterClose}>
      <div>{renderContent({ modalContentType, isSubmitting, contact })}</div>
    </Modal>
  )
}

export default ProfileModal
