import React, { Dispatch, FC, SetStateAction, useState } from 'react'
import { AccountUpdateModal } from './account-update-modal'
import { useGlobalState } from '../../core/use-global-state'
import { Button, ButtonGroup, elMb11, Table, useModal } from '@reapit/elements'
import { SendFunction, useReapitUpdate } from '@reapit/utils-react'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../core/connect-session'

export const handleModalOpen =
  (accountId: string, setSelectedAccountId: Dispatch<SetStateAction<string | null>>, openModal: () => void) => () => {
    setSelectedAccountId(accountId)
    openModal()
  }

export const handleDeleteAccount =
  (accountId: string, deleteAccount: SendFunction<void, boolean>, refreshAccounts: () => void) => async () => {
    const accountDeleted = await deleteAccount(undefined, { uriParams: { accountId } })

    if (accountDeleted) {
      refreshAccounts()
    }
  }

export const AccountsTable: FC = () => {
  const { accounts, refreshAccounts } = useGlobalState()
  const { Modal, openModal, closeModal } = useModal()
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null)

  const [accountDeleting, , deleteAccount] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.updateDwAccount],
    method: 'PATCH',
  })

  return (
    <>
      <Table
        className={elMb11}
        rows={accounts?._embedded?.map(({ username, status, id }) => ({
          cells: [
            {
              label: 'User Name',
              value: username,
              icon: 'userInfographic',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Status',
              value: status,
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
          ],
          expandableContent: {
            content: (
              <ButtonGroup alignment="center">
                <Button
                  intent="primary"
                  onClick={handleModalOpen(id, setSelectedAccountId, openModal)}
                  disabled={status !== 'User is active' || accountDeleting}
                >
                  Update
                </Button>
                <Button
                  intent="danger"
                  onClick={handleDeleteAccount(id, deleteAccount, refreshAccounts)}
                  disabled={accountDeleting}
                  loading={accountDeleting}
                >
                  Deactivate
                </Button>
              </ButtonGroup>
            ),
          },
        }))}
      />
      <Modal title="Data Warehouse Password Update">
        <AccountUpdateModal closeModal={closeModal} accountId={selectedAccountId} />
      </Modal>
    </>
  )
}

export default AccountsTable
