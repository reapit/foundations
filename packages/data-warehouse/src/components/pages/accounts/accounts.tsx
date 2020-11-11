import React, { useState, useEffect, useContext } from 'react'
import { Button, H3, H5, Section, Helper, Loader } from '@reapit/elements'
import { getAccountsService } from '../../../services/accounts'
import { PagedApiResponse } from '../../../types/core'
import { AccountModel } from '../../../types/accounts'
import AccountsTable from './accounts-table'
import { MessageContext } from '../../../context/message-context'
import AccountProvisionModal from './account-provision-modal'
import AccountProgressBar from './account-progress-bar'
import FadeIn from '../../../styles/fade-in'

export const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<PagedApiResponse<AccountModel>>()
  const [accountsLoading, setAccountsLoading] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [provisionInProgress, setProvisionInProgress] = useState<boolean>(false)
  const [percentageComplete, setPercentageComplete] = useState(0)
  const { setMessageState } = useContext(MessageContext)
  const handleModalClose = () => setModalVisible(false)
  const handleModalOpen = () => setModalVisible(true)

  useEffect(() => {
    const getAccounts = async () => {
      setAccountsLoading(true)
      const accounts = await getAccountsService()
      setAccountsLoading(false)
      if (accounts) {
        return setAccounts(accounts)
      }
      return setMessageState({ errorMessage: 'Something went wrong fetching accounts, please try again' })
    }
    getAccounts()
  }, [setAccounts, setAccountsLoading])

  return (
    <>
      <Section className="justify-between items-center" isFlex>
        <H3 className="mb-0">Accounts</H3>
        <Button
          onClick={handleModalOpen}
          loading={provisionInProgress && percentageComplete < 100}
          disabled={provisionInProgress && percentageComplete < 100}
        >
          Provision Account
        </Button>
        <AccountProvisionModal
          visible={modalVisible}
          handleClose={handleModalClose}
          setAccounts={setAccounts}
          setProvisionInProgress={setProvisionInProgress}
          setPercentageComplete={setPercentageComplete}
        />
      </Section>
      {provisionInProgress && (
        <AccountProgressBar percentageComplete={percentageComplete} setPercentageComplete={setPercentageComplete} />
      )}
      <Section>
        <H5>Account Details</H5>
        {accountsLoading ? (
          <Loader />
        ) : accounts?._embedded.length ? (
          <FadeIn>
            <AccountsTable accounts={accounts?._embedded ?? []} setAccounts={setAccounts} />
          </FadeIn>
        ) : (
          <FadeIn>
            <Helper variant="info">No accounts yet provisioned for your organisation</Helper>
          </FadeIn>
        )}
      </Section>
    </>
  )
}

export default Accounts
