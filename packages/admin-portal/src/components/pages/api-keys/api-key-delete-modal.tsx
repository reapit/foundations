import React from 'react'
import { cx } from '@linaria/utils'
import { Button, ButtonGroup, elMt6, FlexContainer, Modal } from '@reapit/elements'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitUpdate } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from '../../../core/connect-session'

export const ApiKeyDeleteConfirmModal = ({
  apiKeyId,
  isOpen,
  onClose,
  onDelete,
  connectSession,
}: {
  apiKeyId: string
  isOpen: boolean
  onClose: () => void
  onDelete: (apiKeyId: string) => void
  connectSession: any
}) => {
  const [loading, , deleteApiKey] = useReapitUpdate<void, void>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.deleteApiKey],
    uriParams: {
      apiKeyId,
    },
    headers: {
      Authorization: connectSession?.idToken,
    },
    method: 'DELETE',
  })

  const confirmDeleteApiKey = async () => {
    await deleteApiKey()
    onDelete(apiKeyId)
  }

  return (
    <Modal onModalClose={onClose} isOpen={isOpen} title="Confirm Delete">
      <p>are you sure you wish to delete this apiKey?</p>
      <FlexContainer className={cx(elMt6)} isFlexJustifyCenter={true}>
        <ButtonGroup>
          <Button intent="low" onClick={onClose}>
            No
          </Button>
          <Button onClick={confirmDeleteApiKey} loading={loading} intent="danger">
            Yes
          </Button>
        </ButtonGroup>
      </FlexContainer>
    </Modal>
  )
}
