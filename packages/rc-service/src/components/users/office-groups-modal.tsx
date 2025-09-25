import { useModal, Button, Modal, PersistentNotification, Table, ButtonGroup, elMb6 } from '@reapit/elements'
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
          <Table
            className={threeColTable}
            rows={[
              {
                cells: [
                  {
                    label: 'Group Name',
                    value: userOfficeGroup.name,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Office Group Id',
                    value: userOfficeGroup.customerId,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Office Ids',
                    value: userOfficeGroup.officeIds,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                ],
              },
            ]}
          />
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
