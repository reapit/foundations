import React, { useContext, useEffect, useState } from 'react'
import { H3, H5, Section, Content, Helper, Loader } from '@reapit/elements'
import { MessageContext } from '../../../context/message-context'
import { PagedApiResponse } from '../../../types/core'
import { DataSetModel } from '../../../types/data-sets'
import { SharesModel } from '../../../types/shares'
import FadeIn from '../../../styles/fade-in'
import DataSetsTable from './data-sets-table'
import SharesTable from './shares-table'
import { AccountModel } from '../../../types/accounts'
import { SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { getCurrentSubscription, handleGetSubscriptions } from '../subscriptions/subscriptions-handlers'
import { handleGetAccounts } from '../accounts/account-handlers'
import { handleGetDataSets, handleGetShares } from './data-handlers'

export type DataProps = {}

export const Data: React.FC<DataProps> = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionModelPagedResult>()
  const [subscriptionsLoading, setSubscriptionsLoading] = useState<boolean>(false)
  const [accounts, setAccounts] = useState<PagedApiResponse<AccountModel>>()
  const [accountsLoading, setAccountsLoading] = useState<boolean>(false)
  const [dataSets, setDataSets] = useState<PagedApiResponse<DataSetModel>>()
  const [dataSetsLoading, setDataSetsLoading] = useState<boolean>(false)
  const [shares, setShares] = useState<PagedApiResponse<SharesModel>>()
  const [sharesLoading, setSharesLoading] = useState<boolean>(false)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const currentSubscription = getCurrentSubscription(subscriptions)

  const { setMessageState } = useContext(MessageContext)

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

  useEffect(handleGetDataSets(setDataSets, setDataSetsLoading, setMessageState, currentSubscription), [
    setDataSets,
    setDataSetsLoading,
    currentSubscription,
  ])

  useEffect(handleGetShares(setShares, setSharesLoading, setMessageState, currentSubscription), [
    setShares,
    setSharesLoading,
    currentSubscription,
  ])

  return (
    <>
      <Content>
        <H3 isHeadingSection>Data</H3>
        {subscriptionsLoading ? (
          <Loader />
        ) : currentSubscription ? (
          <>
            <Section>
              <H5>Available Data</H5>
              {dataSetsLoading ? (
                <Loader />
              ) : dataSets?._embedded.length ? (
                <FadeIn>
                  <DataSetsTable
                    dataSets={dataSets._embedded}
                    setShares={setShares}
                    hasAccount={Boolean(accounts?._embedded.length)}
                  />
                </FadeIn>
              ) : (
                <FadeIn>
                  <Helper variant="info">No datasets available for your organisation</Helper>
                </FadeIn>
              )}
            </Section>
            <Section>
              <H5>Data Shares</H5>
              {sharesLoading || accountsLoading ? (
                <Loader />
              ) : !accounts?._embedded.length ? (
                <FadeIn>
                  <Helper variant="info">
                    You will need to provision an account from the Accounts page before you can share data
                  </Helper>
                </FadeIn>
              ) : shares?._embedded.length ? (
                <FadeIn>
                  <SharesTable shares={shares._embedded} setShares={setShares} />
                </FadeIn>
              ) : (
                <FadeIn>
                  <Helper variant="info">No data shares available for your organisation</Helper>
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
      </Content>
    </>
  )
}

export default Data
