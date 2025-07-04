import React, { FC } from 'react'
import { UserModel } from '@reapit/foundations-ts-definitions'
import { BodyText, Button, Loader, Modal, ModalHeader, Title, useModal } from '@reapit/elements'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { toLocalTime } from '@reapit/utils-common'

export const UserStatusHistory: FC<{ user: UserModel }> = ({ user }) => {
  const { modalIsOpen, closeModal, openModal } = useModal()

  const [history, loading] = useReapitGet<{
    _embedded: {
      id: number
      actor: string
      notify: boolean
      reason?: string
      status: 'active' | 'inactive'
      category: string
      userId: string
      created: string
    }[]
  }>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getUserStatusHistory],
    uriParams: { id: user.id },
    fetchWhenTrue: [modalIsOpen],
  })

  return (
    <>
      <Button intent="primary" onClick={openModal}>
        Review Status History
      </Button>
      <Modal isOpen={modalIsOpen} onModalClose={closeModal}>
        <ModalHeader>
          <Title>Status History</Title>
        </ModalHeader>
        {loading && <Loader />}
        {!loading && history?._embedded.length === 0 && <BodyText>No history</BodyText>}
        {history?._embedded?.map((history) => (
          <BodyText key={`${history.id}-${history.userId}`}>
            {toLocalTime(history.created)} Set to {history.status} by {history.actor} |{' '}
            {history.notify && 'Email Sent |'} {history.category} {history.reason && '|'} {history.reason}
          </BodyText>
        ))}
      </Modal>
    </>
  )
}
