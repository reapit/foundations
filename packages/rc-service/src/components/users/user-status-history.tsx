import React, { FC } from 'react'
import { UserModel } from '@reapit/foundations-ts-definitions'
import {
  BodyText,
  Button,
  ButtonGroup,
  elFadeIn,
  elMb11,
  Icon,
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
import dayjs from 'dayjs'
import { customModal } from './__styles__'
import styled from 'styled-components'

const InlineIcon = styled(Icon)`
  margin-right: 0 !important;
  width: 16px;
`

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
      <Button intent="neutral" onClick={openModal}>
        <InlineIcon icon="calendar" />
      </Button>
      <Modal className={cx(customModal)} isOpen={modalIsOpen} onModalClose={closeModal}>
        <ModalHeader>
          <Title>Status History</Title>
        </ModalHeader>
        {loading && <Loader />}
        {!loading && history?._embedded.length === 0 && <BodyText>No history</BodyText>}
        <Table
          className={cx(elFadeIn, elMb11)}
          numberColumns={5}
          rows={history?._embedded?.map((item) => {
            const { created, status, actor, notify, category, reason } = item
            return {
              cells: [
                {
                  label: 'Created',
                  value: dayjs(created).format('DD/MM/YYYY HH:mm:ss') ?? '-',
                },
                {
                  label: 'Status',
                  value: status ? status.charAt(0).toUpperCase() + status?.slice(1) : '-',
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
              ],
              expandableContent: {
                content: (
                  <>
                    <BodyText>
                      <strong>Changed By:</strong> {actor ?? '-'}
                    </BodyText>
                    <BodyText>
                      <strong>Reason:</strong> {reason ?? '-'}
                    </BodyText>
                  </>
                ),
              },
            }
          })}
        />
        <ButtonGroup alignment="right">
          <Button onClick={closeModal}>Close</Button>
        </ButtonGroup>
      </Modal>
    </>
  )
}
