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
  elMb6,
} from '@reapit/elements'
import React, { FC } from 'react'
import { OfficeGroupModel, UserInfoModel } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions, useReapitGet } from '@reapit/use-reapit-data'
import { threeColTable } from './__styles__'

export const OfficeGroupsModal: FC<{ email: string; orgId: string }> = ({ email, orgId }) => {
  const { modalIsOpen, openModal, closeModal } = useModal()
  const [userInfo, userInfoLoading] = useReapitGet<UserInfoModel & { orgOfficeGroups: OfficeGroupModel[] }>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getUserInfo],
    queryParams: { email: encodeURIComponent(email) },
    fetchWhenTrue: [modalIsOpen],
  })
  const userOfficeGroup = userInfo?.orgOfficeGroups?.find((group) => group.organisationId === orgId)

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
        {userInfo && modalIsOpen && userOfficeGroup ? (
          <>
            <Table>
              <TableHeadersRow className={threeColTable}>
                <TableHeader>Group Name</TableHeader>
                <TableHeader>Office Group Id</TableHeader>
                <TableHeader>Office Ids</TableHeader>
              </TableHeadersRow>
              <TableRow className={threeColTable}>
                <TableCell>{userOfficeGroup.name}</TableCell>
                <TableCell>{userOfficeGroup.id}</TableCell>
                <TableCell>{userOfficeGroup.officeIds}</TableCell>
              </TableRow>
            </Table>
          </>
        ) : modalIsOpen ? (
          <PersistentNotification isFullWidth isExpanded isInline intent="primary" className={elMb6}>
            User not part of an office group in this Organisation.
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
