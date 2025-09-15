import {
  useModal,
  Button,
  Modal,
  Icon,
  PersistentNotification,
  Table,
  TableCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
  ButtonGroup,
} from '@reapit/elements'
import React, { FC } from 'react'
import { UserInfoModel } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from 'src/core/connect-session'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import { threeColTable } from './__styles__'

export const OfficeGroupsModal: FC<{ email: string }> = ({ email }) => {
  const { modalIsOpen, openModal, closeModal } = useModal()
  const [userInfo, userInfoLoading] = useReapitGet<UserInfoModel>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getUserInfo],
    queryParams: { email: encodeURIComponent(email) },
    fetchWhenTrue: [modalIsOpen],
  })

  return (
    <>
      <Button intent="neutral" onClick={openModal}>
        Check
      </Button>
      <Modal
        title="Office Groups"
        isOpen={modalIsOpen}
        onModalClose={() => {
          closeModal()
        }}
      >
        {userInfo && modalIsOpen && userInfo.officeGroupIds ? (
          <>
            <Table>
              <TableHeadersRow className={threeColTable}>
                <TableHeader>Group Name</TableHeader>
                <TableHeader>Office Group Id</TableHeader>
                <TableHeader>Office Ids</TableHeader>
              </TableHeadersRow>
              <TableRow className={threeColTable}>
                <TableCell>{userInfo.officeGroupName}</TableCell>
                <TableCell>{userInfo.officeGroupId}</TableCell>
                <TableCell>{userInfo.officeGroupIds}</TableCell>
              </TableRow>
            </Table>
          </>
        ) : modalIsOpen ? (
          <PersistentNotification isFullWidth isExpanded isInline intent="primary">
            User not part of an office group.
          </PersistentNotification>
        ) : null}
        <ButtonGroup alignment="right">
          <Button
            loading={userInfoLoading && modalIsOpen}
            intent="neutral"
            disabled={userInfoLoading && modalIsOpen}
            onClick={closeModal}
          >
            Close
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  )
}
