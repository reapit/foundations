import React, { useEffect, Dispatch, SetStateAction, useState, FC } from 'react'
import {
  CreateSubscriptionModel,
  SubscriptionModel,
  SubscriptionModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import { objectToQuery, SendFunction, useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { Button } from '@reapit/elements'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { usePermissionsState } from '../../core/use-permissions-state'

export type SubscriptionType = 'applicationListing' | 'developerRegistration' | 'developerEdition'

export interface CreateSubscriptionsButtonProps {
  subscriptionType: SubscriptionType
  developerId?: string
  appId?: string
}

export const getCurrentSub =
  (
    subscriptions: SubscriptionModelPagedResult | null,
    subscriptionType: SubscriptionType,
    setCurrentSub: Dispatch<SetStateAction<SubscriptionModel | null>>,
  ) =>
  () => {
    if (subscriptions?.data && subscriptionType === 'applicationListing') {
      const sub = subscriptions.data.find((sub) => sub.type === 'applicationListing' && !sub.cancelled) ?? null
      setCurrentSub(sub)
    }

    if (subscriptions?.data && subscriptionType === 'developerRegistration') {
      const sub = subscriptions.data.find((sub) => sub.type === 'developerRegistration' && !sub.cancelled) ?? null
      setCurrentSub(sub)
    }
  }

export const createSubscriptionHander =
  (
    createSubscription: SendFunction<CreateSubscriptionModel, boolean>,
    createSubscriptionModel: CreateSubscriptionModel,
  ) =>
  () => {
    createSubscription(createSubscriptionModel)
  }

export const cancelSubscriptionHander = (cancelSubscription: SendFunction<void, boolean>) => () => {
  cancelSubscription()
}

export const handleRefreshSubs = (subscriptionsRefresh: () => void, shouldRefresh?: boolean) => () => {
  if (shouldRefresh) {
    subscriptionsRefresh()
  }
}

export const handleFetchSubs = (setShouldFetchSubs: Dispatch<SetStateAction<boolean>>) => () => {
  setShouldFetchSubs(true)
}

export const CreateSubscriptionsButton: FC<CreateSubscriptionsButtonProps> = ({
  subscriptionType,
  developerId,
  appId,
}) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { hasReadAccess } = usePermissionsState()
  const email = connectSession?.loginIdentity.email
  const [currentSub, setCurrentSub] = useState<SubscriptionModel | null>(null)
  const [shouldFetchSubs, setShouldFetchSubs] = useState<boolean>(false)
  const queryParams = objectToQuery({
    appId,
    developerId,
    subscriptionType,
  })

  const [subscriptions, subscriptionsLoading, , subscriptionsRefresh] = useReapitGet<SubscriptionModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getSubscriptions],
    queryParams: {
      ...queryParams,
      pageSize: 999,
    },
    fetchWhenTrue: [shouldFetchSubs],
  })

  const [cancelSubscriptionLoading, , cancelSubscription, subscriptionCancelled] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.deleteSubscription],
    method: 'DELETE',
    uriParams: {
      subscriptionId: currentSub?.id,
    },
  })

  const [createSubscriptionLoading, , createSubscription, subscriptionCreated] = useReapitUpdate<
    CreateSubscriptionModel,
    boolean
  >({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.createSubscription],
    method: 'POST',
  })

  const shouldRefresh = subscriptionCancelled || subscriptionCreated

  useEffect(getCurrentSub(subscriptions, subscriptionType, setCurrentSub), [subscriptions, subscriptionType])
  useEffect(handleRefreshSubs(subscriptionsRefresh, shouldRefresh), [subscriptionCancelled, subscriptionCreated])

  return !shouldFetchSubs || !subscriptions ? (
    <Button
      onClick={handleFetchSubs(setShouldFetchSubs)}
      intent="secondary"
      loading={subscriptionsLoading}
      disabled={hasReadAccess || subscriptionsLoading}
    >
      Check Subscriptions
    </Button>
  ) : currentSub ? (
    <Button
      onClick={cancelSubscriptionHander(cancelSubscription)}
      intent="secondary"
      loading={cancelSubscriptionLoading || subscriptionsLoading}
      disabled={hasReadAccess || cancelSubscriptionLoading || subscriptionsLoading}
    >
      Unsubscribe
    </Button>
  ) : (
    <Button
      onClick={createSubscriptionHander(createSubscription, {
        developerId,
        applicationId: appId,
        user: email,
        type: subscriptionType,
      })}
      intent="primary"
      loading={createSubscriptionLoading || subscriptionsLoading}
      disabled={hasReadAccess || createSubscriptionLoading || subscriptionsLoading}
    >
      Subscribe
    </Button>
  )
}
