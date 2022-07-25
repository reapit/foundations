import React, { useState } from 'react'
import {
  Button,
  elMt6,
  FlexContainer,
  Table,
  TableCell,
  TableCtaTriggerCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
  TableRowContainer,
} from '@reapit/elements'
import { ApiKeyEntityType, ApiKeyInterface } from '@reapit/foundations-ts-definitions'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { useReapitUpdate } from '@reapit/utils-react'
import { UpdateReturnTypeEnum } from '@reapit/utils-react/src/use-reapit-data/use-reapit-update'
import { cx } from '@linaria/utils'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { ApiKeyDeleteConfirmModal } from './api-key-delete-modal'

export const ApiKeyTable = ({
  initialPagination,
  connectSession,
  email,
  developerId,
}: {
  initialPagination?: { items: ApiKeyInterface[] } | null
  connectSession: any
  email: string
  developerId: string
}) => {
  const [deleteModal, setDeleteModal] = useState<string | undefined>()
  const [items, setItems] = useState<ApiKeyInterface[]>(initialPagination?.items || [])

  const [isCreating, , createApiKey] = useReapitUpdate<Partial<ApiKeyInterface>, ApiKeyInterface>({
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.createApiKeyByMember],
    reapitConnectBrowserSession,
    method: 'POST',
    headers: {
      Authorization: connectSession?.idToken as string,
    },
    returnType: UpdateReturnTypeEnum.RESPONSE,
  })

  const createNewApiKey = async (apiKey: Partial<ApiKeyInterface>) => {
    const result = await createApiKey(apiKey)

    if (result && typeof result === 'object') {
      // TODO add to pagination OR add new table row but with pasaze
      setItems([...items, result])
    }
  }

  return (
    <>
      {items.length >= 1 ? (
        <Table numberColumns={3}>
          <TableHeadersRow>
            <TableHeader>Api Key</TableHeader>
            <TableHeader>Expires</TableHeader>
            <TableHeader></TableHeader>
          </TableHeadersRow>
          {items.map((item) => (
            <TableRowContainer key={item.id}>
              <TableRow>
                <TableCell>{item.apiKey}</TableCell>
                <TableCell>{item.keyExpiresAt}</TableCell>
                <TableCtaTriggerCell icon="trashSystem" onClick={() => setDeleteModal(item.id)} />
                <ApiKeyDeleteConfirmModal
                  connectSession={connectSession}
                  isOpen={deleteModal === item.id}
                  apiKeyId={item.id as string}
                  onClose={() => {
                    setDeleteModal(undefined)
                  }}
                  onDelete={(apiKeyId) => {
                    // TODO remove apikey from pagination results
                    setItems(items.filter((currentItem) => currentItem.id !== apiKeyId))
                    setDeleteModal(undefined)
                  }}
                />
              </TableRow>
            </TableRowContainer>
          ))}
        </Table>
      ) : (
        <h4>No api keys</h4>
      )}
      <FlexContainer className={cx(elMt6)} isFlexRow={true} isFlexJustifyEnd={true}>
        <Button
          loading={isCreating}
          intent="secondary"
          onClick={() => {
            const keyExpiresAt = new Date()
            keyExpiresAt.setFullYear(keyExpiresAt.getFullYear() + 1)
            createNewApiKey({
              email,
              keyExpiresAt: keyExpiresAt.toISOString(),
              entityType: ApiKeyEntityType.DEPLOYMENT,
              developerId,
            })
          }}
        >
          Create New
        </Button>
      </FlexContainer>
    </>
  )
}
