import React from 'react'
import { Button } from '@reapit/elements'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsWebComponentOpen } from '@/selector/client'
import { clientCloseWebComponentConfig, clientOpenWebComponentConfig } from '@/actions/client'
import { Dispatch } from 'redux'
import WebComponentModal from '@/components/ui/web-component-config-modal'
import { AppDetailSection } from '../common/ui-helpers'

export const toggleWebComponentModal = (dispatch: Dispatch) => () => {
  dispatch(clientOpenWebComponentConfig())
}

export const closeWebComponentModal = (dispatch: Dispatch) => () => {
  dispatch(clientCloseWebComponentConfig())
}

export const WebComponentConfig: React.FC = () => {
  const dispatch = useDispatch()
  const isWebComponentOpen = useSelector(selectIsWebComponentOpen)
  const handleToggleWebComponentModal = toggleWebComponentModal(dispatch)
  const handleCloseWebComponentModal = closeWebComponentModal(dispatch)
  return (
    <AppDetailSection headerText="Settings" isSidebar>
      <Button type="button" variant="primary" fullWidth onClick={handleToggleWebComponentModal}>
        Configuration
      </Button>
      {isWebComponentOpen && (
        <WebComponentModal
          type="BOOK_VIEWING"
          afterClose={handleCloseWebComponentModal}
          closeModal={handleCloseWebComponentModal}
        />
      )}
    </AppDetailSection>
  )
}
