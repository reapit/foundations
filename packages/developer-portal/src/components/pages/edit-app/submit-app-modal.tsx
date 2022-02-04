import { ModalProps } from '@reapit/elements'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentMemberData } from '../../../selector/current-member'
import { selectSettingsPageDeveloperInformation } from '../../../selector/settings'

export interface SubmitAppModalProps {
  Modal: FC<Partial<ModalProps>>
}

export const getTitle = () => {
  
}

export const SubmitAppModal: FC<SubmitAppModalProps> = ({ Modal }) => {
  const currentUser = useSelector(selectCurrentMemberData)
  const currentOrganisation = useSelector(selectSettingsPageDeveloperInformation)

  const userRole = currentUser.role
  const orgStatus = currentOrganisation.status

  return <Modal></Modal>
}
