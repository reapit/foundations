import React, { FC } from 'react'
import { UserModel } from '@reapit/foundations-ts-definitions'
import {
  BodyText,
  Button,
  elFadeIn,
  elMb11,
  Loader,
  Modal,
  ModalHeader,
  Table,
  Title,
  useModal,
} from '@reapit/elements'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { cx } from '@linaria/core'

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
        <Table
          className={cx(elFadeIn, elMb11)}
          rows={history?._embedded?.map((item) => {
            const { created, status, actor, notify, category, reason } = item
            return {
              cells: [
                {
                  label: 'Created',
                  value: created ?? '-',
                },
                {
                  label: 'Status',
                  value: status ?? '-',
                },
                {
                  label: 'Changed By',
                  value: actor ?? '-',
                },
                {
                  label: 'User Notified',
                  value: notify ? 'Yes' : 'No',
                },
                {
                  label: 'Category',
                  value: category ?? '-',
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Reason',
                  value: reason ?? '-',
                  narrowTable: {
                    showLabel: true,
                  },
                },
              ],
            }
          })}
        />
      </Modal>
    </>
  )
}
