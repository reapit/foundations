import React, { FC } from 'react'
import {
  BodyText,
  Button,
  ButtonGroup,
  Loader,
  Pagination,
  PersistentNotification,
  Table,
  useModal,
} from '@reapit/elements'
import { SendFunction, useReapitUpdate, updateActions, UpdateActionNames } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { handleModalAction, useNetworkState } from './use-network-state'

export const handleDeleteIp =
  (deleteIp: SendFunction<void, boolean>, refreshIps: () => void, closeModal: () => void) => async () => {
    const accountDeleted = await deleteIp()

    if (accountDeleted) {
      refreshIps()
      closeModal()
    }
  }

export const IpTable: FC = () => {
  const { Modal, openModal, closeModal } = useModal()
  const {
    ips,
    setIpsPageNumber,
    ipsPageNumber,
    ipsLoading,
    networkSelected,
    setNetworkSelected,
    refreshIps,
    customerId,
  } = useNetworkState()

  const ruleId = networkSelected?.ruleId
  const ipId = networkSelected?.ipId

  const [ipDeleting, , deleteIp] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.deleteIp],
    method: 'DELETE',
    uriParams: {
      ruleId,
      customerId,
      ipId,
    },
  })

  return (
    <>
      {ipsLoading ? (
        <Loader />
      ) : ips?._embedded.length ? (
        <>
          <Table
            numberColumns={3}
            rows={ips?._embedded?.map(({ cidr, ipAddress, id }) => {
              return {
                cells: [
                  {
                    label: 'IP Address',
                    value: ipAddress,
                    cellHasDarkText: true,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'CIDR',
                    value: cidr,
                    cellHasDarkText: true,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                ],
                ctaContent: {
                  icon: 'trash',
                  headerContent: 'Delete IP',
                  onClick: handleModalAction(setNetworkSelected, openModal, 'ipId', id),
                },
              }
            })}
          />
          <Pagination callback={setIpsPageNumber} currentPage={ipsPageNumber} numberPages={ips.totalPageCount || 0} />
        </>
      ) : (
        <PersistentNotification isInline isExpanded isFullWidth intent="primary">
          No IPs whitelisted for this network rule
        </PersistentNotification>
      )}
      <Modal title="Delete IP Confirm">
        <BodyText>
          Are you sure you want to delete this IP? This action cannot be reversed and may cause issues with access to
          your Data.
        </BodyText>
        <ButtonGroup alignment="right">
          <Button
            intent="danger"
            onClick={handleDeleteIp(deleteIp, refreshIps, closeModal)}
            disabled={ipDeleting}
            loading={ipDeleting}
          >
            Delete
          </Button>
          <Button
            intent="default"
            onClick={handleModalAction(setNetworkSelected, closeModal, 'ipId', null)}
            disabled={ipDeleting}
            loading={ipDeleting}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </Modal>
    </>
  )
}
