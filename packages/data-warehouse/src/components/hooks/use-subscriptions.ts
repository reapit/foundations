import { useCallback, useContext, useEffect, useState } from 'react'

import { useReapitConnect } from '@reapit/connect-session'
import { SubscriptionModelPagedResult } from '@reapit/foundations-ts-definitions'

import { MessageContext } from '../../context/message-context'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { createSubscription, getCurrentSubscription, handleGetSubscriptions } from './subscriptions-handlers'

export const useSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionModelPagedResult>()
  const [subscriptionsLoading, setSubscriptionsLoading] = useState<boolean>(false)
  const { setMessageState } = useContext(MessageContext)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const loginIdentity = connectSession?.loginIdentity ?? null
  const clientId = connectSession?.loginIdentity?.clientId ?? null
  const currentSubscription = getCurrentSubscription(subscriptions)

  useEffect(handleGetSubscriptions(setSubscriptions, setSubscriptionsLoading, setMessageState, connectSession), [
    setSubscriptions,
    setSubscriptionsLoading,
    connectSession,
  ])

  const createSubscriptionCb = useCallback(
    () => loginIdentity && createSubscription(loginIdentity, setMessageState, setSubscriptions),
    [currentSubscription, loginIdentity, setMessageState, setSubscriptions],
  )

  return {
    subscriptionsLoading,
    currentSubscription,
    createSubscription: createSubscriptionCb,
    loginIdentity,
    clientId,
  }
}
