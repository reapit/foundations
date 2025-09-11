import {
  useModal,
  Button,
  Modal,
  BodyText,
  FormLayout,
  InputWrapFull,
  InputGroup,
  ButtonGroup,
  Loader,
  PersistantNotification,
} from '@reapit/elements'
import {
  useReapitGet,
  getActions,
  GetActionNames,
  updateActions,
  UpdateActionNames,
  useReapitUpdate,
} from '@reapit/use-reapit-data'
import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { EmailSuppressionModel } from '@reapit/foundations-ts-definitions'

export const SupressionListModal: FC<{ userId?: string; email?: string }> = ({ userId, email }) => {
  const { modalIsOpen, openModal, closeModal } = useModal()

  const [userSuppressionList, userSuppressionListLoading, error, refresh] = useReapitGet<EmailSuppressionModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getUserSuppressionList],
    uriParams: { userId },
    fetchWhenTrue: [userId, modalIsOpen],
    onError: () => {},
  })

  const [userSuppressionListDeleteLoading, , deleteUserSuppressionList] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.deleteUserSuppressionList],
    method: 'DELETE',
    uriParams: {
      userId,
    },
  })

  return (
    <>
      <Button intent="neutral" onClick={openModal}>
        Check
      </Button>
      <Modal
        title="Supression List"
        isOpen={modalIsOpen}
        onModalClose={() => {
          closeModal()
        }}
      >
        {userSuppressionListLoading && <Loader />}
        {error && (
          <BodyText>
            Unable to fetch suppression list status{' '}
            <PersistantNotification intent="danger" isInline isExpanded isFullWidth>
              {error}
            </PersistantNotification>
          </BodyText>
        )}
        {error === null &&
          !userSuppressionListLoading &&
          (userSuppressionList ? (
            <BodyText>{email ?? 'User'} is on the email suppression list - you can remove them below</BodyText>
          ) : (
            <BodyText>{email ?? 'User'} is not on the email suppression list</BodyText>
          ))}
        <ButtonGroup alignment="center">
          {userSuppressionList && (
            <Button
              intent="primary"
              disabled={userSuppressionListDeleteLoading}
              onClick={async () => {
                await deleteUserSuppressionList()
                refresh()
              }}
            >
              Remove from list
            </Button>
          )}
          <Button intent="default" onClick={closeModal}>
            Close
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  )
}
