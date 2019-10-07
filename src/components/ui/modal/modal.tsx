import React from 'react'
import { Modal } from '@reapit/elements'
import Profile from './profile'
import Report from './report'
import AddressInformation from './address-information'
import PrimaryIdentification from './primary-identification'
import SecondaryIdentification from './secondary-identification'
import DeclarationAndRiskAssessment from './declaration-and-risk-assessment'

export const STEPS = {
  PROFILE: 'Personal Details',
  PRIMARY_IDENTIFICATION: 'Primary ID',
  SECONDARY_IDENTIFICATION: 'Secondary ID',
  ADDRESS_INFORMATION: 'Address Information',
  REPORT: 'Report',
  DECLARATION_RISK_MANAGEMENT: 'Declaration Risk Management',
  EXPERIAN: 'Experian',
  PEP_SEARCH: 'PEP Search'
}

export type ProfileModalProps = {
  modalContentType: string
  visible: boolean
  id: string
  afterClose: () => void
}

export const renderContent = ({ modalContentType, id }) => {
  switch (modalContentType) {
    case STEPS.PROFILE:
      return <Profile id={id} />

    case STEPS.PRIMARY_IDENTIFICATION:
      return <PrimaryIdentification />

    case STEPS.SECONDARY_IDENTIFICATION:
      return <SecondaryIdentification />

    case STEPS.ADDRESS_INFORMATION:
      return <AddressInformation id={id} />

    case STEPS.REPORT:
      return <Report />

    case STEPS.DECLARATION_RISK_MANAGEMENT:
      return <DeclarationAndRiskAssessment />

    default:
      return null
  }
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  visible,
  afterClose,
  modalContentType = STEPS.PROFILE,
  id
}) => {
  return (
    <Modal title={modalContentType} visible={visible} size="medium" afterClose={afterClose}>
      <div>{renderContent({ modalContentType, id })}</div>
    </Modal>
  )
}

export default ProfileModal
