import React from 'react'
import { Modal } from '@reapit/elements'
import Profile, { combineName } from './profile'
import Report from './report'
import AddressInformation from './address-information'
import PrimaryIdentification from './primary-identification'
import SecondaryIdentification from './secondary-identification'
import { ContactModel } from '@/types/contact-api-schema'
import DeclarationAndRiskAssessment from './declaration-and-risk-assessment'

export const STEPS = {
  PROFILE: 'PROFILE',
  PRIMARY_IDENTIFICATION: 'PRIMARY_IDENTIFICATION',
  SECONDARY_IDENTIFICATION: 'SECONDARY_IDENTIFICATION',
  ADDRESS_INFORMATION: 'ADDRESS_INFORMATION',
  REPORT: 'REPORT',
  DECLARATION_RISK_MANAGEMENT: 'DECLARATION_RISK_MANAGEMENT'
}

export type ProfileModalProps = {
  contact: ContactModel
  isSubmitting: boolean
  modalContentType: string
  visible: boolean
  afterClose: () => void
}

export const renderContent = ({ modalContentType }) => {
  switch (modalContentType) {
    case STEPS.PROFILE:
      return <Profile />
    case STEPS.PRIMARY_IDENTIFICATION:
      return <PrimaryIdentification />
    case STEPS.SECONDARY_IDENTIFICATION:
      return <SecondaryIdentification />
    case STEPS.ADDRESS_INFORMATION:
      return <AddressInformation />
    case STEPS.REPORT:
      return <Report />
    case STEPS.DECLARATION_RISK_MANAGEMENT:
      return <DeclarationAndRiskAssessment />
    default:
      return null
  }
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  contact,
  visible,
  afterClose,
  modalContentType = 'PROFILE'
}) => {
  return (
    <Modal title={combineName(contact)} visible={visible} size="medium" afterClose={afterClose}>
      <div>{renderContent({ modalContentType })}</div>
    </Modal>
  )
}

export default ProfileModal
