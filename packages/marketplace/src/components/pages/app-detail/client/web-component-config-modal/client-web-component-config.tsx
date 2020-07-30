import React, { useEffect, useState } from 'react'
import { Button } from '@reapit/elements'
import { useDispatch, useSelector } from 'react-redux'
import { selectWebComponentData } from '@/selector/web-components'
import { fetchWebComponentConfig } from '@/actions/web-component'
import { Dispatch } from 'redux'
import WebComponentModal from '@/components/pages/app-detail/client/web-component-config-modal/config-modal'
import { AppDetailSection } from '@/components/pages/app-detail/common/ui-helpers'
import { selectClientId } from '@/selector/auth'
import { useParams } from 'react-router-dom'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export const toggleWebComponentModal = (setIsOpenConfigModal, isOpen) => () => {
  setIsOpenConfigModal(isOpen)
}

export const handleFetchWebComponentConfig = (
  dispatch: Dispatch,
  customerId?: string,
  applicationId?: string,
) => () => {
  customerId && applicationId && dispatch(fetchWebComponentConfig({ customerId, applicationId }))
}

export const WebComponentConfig: React.FC = () => {
  const dispatch = useDispatch()
  const [isOpenConfigModal, setIsOpenConfigModal] = useState(false)

  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const clientId = selectClientId(connectSession)
  const webComponentData = useSelector(selectWebComponentData)
  const { appid: applicationId } = useParams<{ appid: string }>()

  const handleToggleWebComponentModal = toggleWebComponentModal(setIsOpenConfigModal, true)
  const handleCloseWebComponentModal = toggleWebComponentModal(setIsOpenConfigModal, false)

  useEffect(handleFetchWebComponentConfig(dispatch, clientId, applicationId), [clientId, applicationId])

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

export default WebComponentConfig
