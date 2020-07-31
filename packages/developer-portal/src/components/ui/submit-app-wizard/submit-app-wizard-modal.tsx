import React, { useEffect } from 'react'
import { ModalV2 } from '@reapit/elements'
import { SubmitAppWizard } from './submit-app-wizard'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import { fetchScopeList } from '@/actions/scopes'

export type SubmitAppWizardModalProps = {
  visible: boolean
  onClose: () => void
}

export const handleUseEffect = (dispatch: Dispatch) => () => {
  dispatch(fetchScopeList())
}

export const SubmitAppWizardModal: React.FC<SubmitAppWizardModalProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch()
  useEffect(handleUseEffect(dispatch), [])

  return (
    <ModalV2 onClose={onClose} visible={visible} isPadding={false}>
      <SubmitAppWizard afterClose={onClose} />
    </ModalV2>
  )
}
