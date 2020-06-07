import React from 'react'
import { Button, H5 } from '@reapit/elements'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsWebComponentOpen } from '@/selector/client'
import { clientCloseWebComponentConfig, clientOpenWebComponentConfig } from '@/actions/client'
import { Dispatch } from 'redux'
import WebComponentModal from '@/components/ui/web-component-config-modal'
import clientAppDetailStyles from '@/styles/pages/client-app-detail.scss?mod'

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
    <div className={clientAppDetailStyles.gutter}>
      <H5>Settings</H5>
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
    </div>
  )
}
