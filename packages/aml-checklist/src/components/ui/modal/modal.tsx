import React from 'react'
import { Modal } from '@reapit/elements'
import Profile from './profile'
import Report from './report'
import AddressInformation from './address-information'
import PrimaryIdentification from './primary-identification'
import SecondaryIdentification from './secondary-identification'
import DeclarationAndRiskAssessment from './declaration-and-risk-assessment'
import PepSearch from './pep-search'
import UpdateStatus from './update-status'
import UpdateStatusSuccess from './update-status-success'
import { withRouter, RouteComponentProps } from 'react-router'

export const STEPS = {
  PROFILE: 'Personal Details',
  PRIMARY_IDENTIFICATION: 'Primary ID',
  SECONDARY_IDENTIFICATION: 'Secondary ID',
  ADDRESS_INFORMATION: 'Address Information',
  REPORT: 'Report',
  DECLARATION_RISK_MANAGEMENT: 'Declaration Risk Management',
  EXPERIAN: 'Experian',
  PEP_SEARCH: 'PEP Search',
}

export const ID_STATUS = {
  UPDATE: 'Update Status',
  SUCCESS: 'Update Status Success',
}

export type ProfileModalProps = {
  modalContentType: string
  visible: boolean
  id: string
  afterClose: () => void
} & RouteComponentProps

export const renderContent = ({ modalContentType, history }) => {
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

    case STEPS.PEP_SEARCH:
      return <PepSearch />

    case STEPS.DECLARATION_RISK_MANAGEMENT:
      return <DeclarationAndRiskAssessment />

    case ID_STATUS.UPDATE:
      return <UpdateStatus />

    case ID_STATUS.SUCCESS:
      return <UpdateStatusSuccess history={history} />
    default:
      return null
  }
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  visible,
  afterClose,
  modalContentType = STEPS.PROFILE,
  history,
}) => {
  return (
    <Modal title={modalContentType} visible={visible} size="medium" afterClose={afterClose}>
      <div>{renderContent({ modalContentType, history })}</div>
    </Modal>
  )
}

export default withRouter(ProfileModal)
