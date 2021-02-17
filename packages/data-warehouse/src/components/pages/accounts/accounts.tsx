import React, { useState, useEffect, useContext } from 'react'
import { Button, H3, H5, Section, Helper, Loader } from '@reapit/elements'
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
import { getCurrentSubscription, handleGetSubscriptions } from '../subscriptions/subscriptions-handlers'
import { handleGetAccounts } from './account-handlers'

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
  const currentSubscription = getCurrentSubscription(subscriptions)
  const handleModalClose = () => setModalVisible(false)
  const handleModalOpen = () => setModalVisible(true)

  useEffect(handleGetSubscriptions(setSubscriptions, setSubscriptionsLoading, setMessageState, connectSession), [
    setSubscriptions,
    setSubscriptionsLoading,
    connectSession,
  ])

  useEffect(handleGetAccounts(setAccounts, setAccountsLoading, setMessageState, currentSubscription), [
    setAccounts,
    setAccountsLoading,
    setMessageState,
    currentSubscription,
  ])

  return (
    <>
      <Section className="justify-between items-center" isFlex>
        <H3 className="mb-0">Users</H3>
        <Button
          onClick={handleModalOpen}
          loading={provisionInProgress && percentageComplete < 100}
          disabled={(provisionInProgress && percentageComplete < 100) || !currentSubscription}
        >
          Provision User Account
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
          <FadeIn>
            <Helper variant="info">
              You are able to manage the credentials used to access your data warehouse. There is no limit on the number
              of user accounts you&apos;re able to add and we recommend that each individual user/application is
              provided with their own credentials.
            </Helper>
          </FadeIn>
          <Section>
            <H5>User Account Details</H5>
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
