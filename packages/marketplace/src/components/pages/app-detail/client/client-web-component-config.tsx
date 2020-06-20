import React, { useEffect, useState } from 'react'
import { Button } from '@reapit/elements'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsWebComponentData } from '@/selector/client'
import { clientFetchWebComponentConfig } from '@/actions/client'
import { Dispatch } from 'redux'
import WebComponentModal from '@/components/ui/web-component-config-modal'
import { AppDetailSection } from '../common/ui-helpers'
import { selectClientId } from '@/selector/auth'
import { useParams } from 'react-router-dom'

export const toggleWebComponentModal = (setIsOpenConfigModal, isOpen) => () => {
  setIsOpenConfigModal(isOpen)
}

export const handleFetchWebComponentConfig = (
  dispatch: Dispatch,
  customerId?: string,
  applicationId?: string,
) => () => {
  customerId && applicationId && dispatch(clientFetchWebComponentConfig({ customerId, applicationId }))
}

export const WebComponentConfig: React.FC = () => {
  const dispatch = useDispatch()
  const [isOpenConfigModal, setIsOpenConfigModal] = useState(false)

  const clientId = useSelector(selectClientId) || ''
  const webComponentData = useSelector(selectIsWebComponentData)
  const { appid: applicationId } = useParams()

  const handleToggleWebComponentModal = toggleWebComponentModal(setIsOpenConfigModal, true)
  const handleCloseWebComponentModal = toggleWebComponentModal(setIsOpenConfigModal, false)

  useEffect(handleFetchWebComponentConfig(dispatch, clientId, applicationId), [])

  if (!webComponentData) return null

  return (
    <AppDetailSection headerText="Settings" isSidebar>
      <Button type="button" variant="primary" fullWidth onClick={handleToggleWebComponentModal}>
        Configuration
      </Button>
      {isOpenConfigModal && (
        <WebComponentModal afterClose={handleCloseWebComponentModal} closeModal={handleCloseWebComponentModal} />
      )}
    </AppDetailSection>
  )
}
