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
import { SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { getSubscriptionsService } from '../../../services/subscriptions'
import { getCurrentSubscription } from '../subscriptions/subscriptions-handlers'

export const Accounts: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionModelPagedResult>()
  const [subscriptionsLoading, setSubscriptionsLoading] = useState<boolean>(false)
  const [accounts, setAccounts] = useState<PagedApiResponse<AccountModel>>()
  const [accountsLoading, setAccountsLoading] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [provisionInProgress, setProvisionInProgress] = useState<boolean>(false)
  const [percentageComplete, setPercentageComplete] = useState(0)
  const { setMessageState } = useContext(MessageContext)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity?.developerId ?? null
  const currentSubscription = getCurrentSubscription(subscriptions, developerId)
  const handleModalClose = () => setModalVisible(false)
  const handleModalOpen = () => setModalVisible(true)

  useEffect(() => {
    const getSubscriptions = async () => {
      setSubscriptionsLoading(true)
      const subscriptions = await getSubscriptionsService()
      setSubscriptionsLoading(false)
      if (subscriptions) {
        return setSubscriptions(subscriptions)
      }
      return setMessageState({ errorMessage: 'Something went wrong fetching subscriptions, please try again' })
    }
    if (developerId) {
      getSubscriptions()
    }
  }, [setSubscriptions, setSubscriptionsLoading, developerId])

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
    if (currentSubscription) {
      getAccounts()
    }
  }, [setAccounts, setAccountsLoading, currentSubscription])

  return (
    <>
      <Section className="justify-between items-center" isFlex>
        <H3 className="mb-0">Accounts</H3>
        <Button
          onClick={handleModalOpen}
          loading={provisionInProgress && percentageComplete < 100}
          disabled={(provisionInProgress && percentageComplete < 100) || !currentSubscription}
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
      {subscriptionsLoading ? (
        <Loader />
      ) : currentSubscription ? (
        <>
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
      ) : (
        <FadeIn>
          <Helper variant="info">
            You do not yet have a subscription to the Data Warehouse yet. Visit the Account page to get started.
          </Helper>
        </FadeIn>
      )}
    </>
  )
}

export default Accounts
