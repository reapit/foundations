import { SubscriptionModel, SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'
import React, { FC, createContext, useContext, useMemo } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import { reapitConnectBrowserSession } from './connect-session'
import { Loader, PageContainer, PersistentNotification } from '@reapit/elements'
import { PagedApiResponse } from '../types/core'
import { AccountModel } from '../types/accounts'

export interface GlobalState {
  currentSubscription: SubscriptionModel | null
  accounts: PagedApiResponse<AccountModel> | null
  refreshAccounts: () => void
}

export const getCurrentSubscription = (subscriptions: SubscriptionModelPagedResult | null) => () => {
  return subscriptions?.data?.length
    ? subscriptions?.data.find((sub) => sub.type === 'dataWarehouse' && !sub.cancelled) ?? null
    : null
}

export const GlobalStateContext = createContext<GlobalState>({} as GlobalState)

const { Provider } = GlobalStateContext

export const GlobalProvider: FC = ({ children }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const clientId = connectSession?.loginIdentity?.clientId
  const orgId = connectSession?.loginIdentity?.orgId

  const [subscriptions, subscriptionsLoading] = useReapitGet<SubscriptionModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getSubscriptions],
    queryParams: { customerId: clientId, pageSize: 999 },
    fetchWhenTrue: [clientId],
  })

  const [accounts, accountsLoading, , refreshAccounts] = useReapitGet<PagedApiResponse<AccountModel>>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getDwAccounts],
    queryParams: { organisationId: orgId, pageSize: 999 },
    fetchWhenTrue: [orgId],
  })

  const currentSubscription = useMemo(getCurrentSubscription(subscriptions), [subscriptions])

  const isLoading = subscriptionsLoading || accountsLoading

  return isLoading ? (
    <PageContainer>
      <Loader fullPage />
    </PageContainer>
  ) : !currentSubscription ? (
    <PageContainer>
      <PersistentNotification isInline isExpanded isFullWidth intent="secondary">
        Unfortunately, we have no record of a current Data Warehouse subscription for your account. If you are
        interested in this Reapit product, please contact your CSM and they will take you through the onboarding
        process.
      </PersistentNotification>
    </PageContainer>
  ) : (
    <Provider
      value={{
        accounts,
        currentSubscription,
        refreshAccounts,
      }}
    >
      {children}
    </Provider>
  )
}

export const useGlobalState = (): GlobalState => {
  return useContext(GlobalStateContext)
}
