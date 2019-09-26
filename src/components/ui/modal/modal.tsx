import React from 'react'
import { Modal } from '@reapit/elements'
import Profile, { combineName } from './profile'
import Report from './report'
import AddressInformation from './address-information'
import PrimaryIdentification from './primary-identification'
import SecondaryIdentification from './secondary-identification'
import { ContactModel } from '@/types/contact-api-schema'

export const STEPS = {
  PROFILE: 'PROFILE',
  PRIMARY_IDENTIFICATION: 'PRIMARY_IDENTIFICATION',
  SECONDARY_IDENTIFICATION: 'SECONDARY_IDENTIFICATION',
  ADDRESS_INFORMATION: 'ADDRESS_INFORMATION',
  REPORT: 'REPORT'
}

export type ProfileModalProps = {
  contact: ContactModel
  isSubmitting: boolean
  modalContentType: string
  visible: boolean
  afterClose: () => void
}

export const renderContent = ({ modalContentType, contact, isSubmitting }) => {
  switch (modalContentType) {
    case STEPS.PROFILE:
      return <Profile contact={contact} isSubmitting={isSubmitting} />

    case STEPS.ADDRESS_INFORMATION:
      return <AddressInformation contact={contact} loading={isSubmitting} />

    case STEPS.REPORT:
      return <Report contact={contact} />

    case STEPS.PRIMARY_IDENTIFICATION:
      return <PrimaryIdentification />

    case STEPS.SECONDARY_IDENTIFICATION:
      return <PrimaryIdentification />

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
