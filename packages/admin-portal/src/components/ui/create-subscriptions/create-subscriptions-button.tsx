import React, { useEffect, Dispatch, SetStateAction, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch as ReduxDispatch } from 'redux'
import { Button } from '@reapit/elements'
import { fetchSubscriptionsByTypeAndDev, createSubscription, cancelSubscription } from '../../../actions/subscriptions'
import {
  selectCancelSubscriptionLoading,
  selectCreateSubscriptionLoading,
  selectSubsByAppId,
  selectSubsByDeveloperId,
} from '../../../selector/subscriptions'
import { CreateSubscriptionModel, SubscriptionModel } from '@reapit/foundations-ts-definitions'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../../../insights/src/core/connect-session'

export type SubscriptionType = 'applicationListing' | 'developerRegistration' | 'developerEdition'

export interface CreateSubscriptionsButtonProps {
  subscriptionType: SubscriptionType
  developerId: string
  appId?: string
}

export interface GetCurrentSubParams {
  subsByAppId: SubscriptionModel[]
  subsByDeveloperId: SubscriptionModel[]
  subscriptionType: SubscriptionType
  setCurrentSub: Dispatch<SetStateAction<SubscriptionModel | null>>
}

export interface CreateSubscriptionParams {
  dispatch: ReduxDispatch
  createSubscriptionModel: CreateSubscriptionModel
}

export interface CancelSubscriptionParams {
  dispatch: ReduxDispatch
  id: string
}

export const getCurrentSub = ({
  subsByAppId,
  subsByDeveloperId,
  subscriptionType,
  setCurrentSub,
}: GetCurrentSubParams) => () => {
  if (subscriptionType === 'applicationListing') {
    const sub = subsByAppId.find((sub) => sub.type === 'applicationListing' && !sub.cancelled) ?? null
    setCurrentSub(sub)
  }

  if (subscriptionType === 'developerRegistration') {
    const sub = subsByDeveloperId.find((sub) => sub.type === 'developerRegistration' && !sub.cancelled) ?? null
    setCurrentSub(sub)
  }
}

export const createSubscriptionHander = ({ dispatch, createSubscriptionModel }: CreateSubscriptionParams) => () => {
  dispatch(createSubscription(createSubscriptionModel))
}

export const cancelSubscriptionHander = ({ dispatch, id }: CancelSubscriptionParams) => () => {
  dispatch(cancelSubscription({ id }))
}

export const CreateSubscriptionsButton: React.FC<CreateSubscriptionsButtonProps> = ({
  subscriptionType,
  developerId,
  appId,
}) => {
  const dispatch = useDispatch()
  const subsByAppId = useSelector(selectSubsByAppId(appId))
  const subsByDeveloperId = useSelector(selectSubsByDeveloperId(developerId))
  const createSubscriptionLoading = useSelector(selectCreateSubscriptionLoading)
  const cancelSubscriptionLoading = useSelector(selectCancelSubscriptionLoading)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [currentSub, setCurrentSub] = useState<SubscriptionModel | null>(null)

  useEffect(getCurrentSub({ setCurrentSub, subsByAppId, subsByDeveloperId, subscriptionType }), [
    subsByAppId,
    subsByDeveloperId,
    subscriptionType,
  ])

  useEffect(() => {
    if (!createSubscriptionLoading && !cancelSubscriptionLoading) {
      dispatch(fetchSubscriptionsByTypeAndDev({ subscriptionType, developerId, appId }))
    }
  }, [subscriptionType, developerId, createSubscriptionLoading, cancelSubscriptionLoading])

  return currentSub ? (
    <Button
      onClick={cancelSubscriptionHander({ dispatch, id: currentSub.id as string })}
      variant="secondary"
      loading={cancelSubscriptionLoading}
      disabled={cancelSubscriptionLoading}
    >
      Unsubscribe
    </Button>
  ) : (
    <Button
      onClick={createSubscriptionHander({
        dispatch,
        createSubscriptionModel: {
          developerId,
          customerId: '',
          applicationId: appId,
          user: connectSession?.loginIdentity.email,
          type: subscriptionType,
        },
      })}
      variant="primary"
      loading={createSubscriptionLoading}
      disabled={createSubscriptionLoading}
    >
      Subscribe
    </Button>
  )
}
