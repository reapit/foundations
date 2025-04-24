import React, { useEffect, Dispatch, SetStateAction, useState, FC } from 'react'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import {
  objectToQuery,
  SendFunction,
  useReapitGet,
  useReapitUpdate,
  GetActionNames,
  getActions,
  UpdateActionNames,
  updateActions,
} from '@reapit/use-reapit-data'
import { elMt5, FormLayout, InputWrap, Label, ToggleRadio } from '@reapit/elements'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { useForm, UseFormWatch, UseFormReset } from 'react-hook-form'
import { v4 as uuid } from 'uuid'

export type SubscriptionType = 'applicationListing' | 'developerRegistration' | 'developerEdition'

export interface CreateSubscriptionsProps {
  subscriptionType: SubscriptionType
  developerId?: string
  appId?: string
}

export interface ToggleSubscribedForm {
  isSubscribed?: 'SUBSCRIBED' | 'NOT_SUBSCRIBED'
}

export const getCurrentSub =
  (
    subscriptions: Marketplace.SubscriptionModelPagedResult | null,
    subscriptionType: SubscriptionType,
    setCurrentSub: Dispatch<SetStateAction<Marketplace.SubscriptionModel | null>>,
    reset: UseFormReset<ToggleSubscribedForm>,
    appId?: string,
  ) =>
  () => {
    if (subscriptions?.data && subscriptionType === 'applicationListing' && appId) {
      const sub =
        subscriptions.data.find(
          (sub) => sub.type === 'applicationListing' && !sub.cancelled && appId === sub.applicationId,
        ) ?? null
      setCurrentSub(sub)
      reset({ isSubscribed: sub ? 'SUBSCRIBED' : 'NOT_SUBSCRIBED' })
    }

    if (subscriptions?.data && subscriptionType === 'developerRegistration') {
      const sub = subscriptions.data.find((sub) => sub.type === 'developerRegistration' && !sub.cancelled) ?? null
      setCurrentSub(sub)
      reset({ isSubscribed: sub ? 'SUBSCRIBED' : 'NOT_SUBSCRIBED' })
    }
  }

export const createSubscriptionHander =
  (
    createSubscription: SendFunction<Marketplace.CreateSubscriptionModel, boolean>,
    createSubscriptionModel: Marketplace.CreateSubscriptionModel,
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

export const handleUpdateAction =
  (createSub: () => void, cancelSub: () => void) =>
  ({ isSubscribed }: ToggleSubscribedForm) => {
    if (isSubscribed === 'SUBSCRIBED') {
      createSub()
    } else {
      cancelSub()
    }
  }

export const handleWatchToggle =
  (createSub: () => void, cancelSub: () => void, watch: UseFormWatch<ToggleSubscribedForm>) => () => {
    const subscription = watch(handleUpdateAction(createSub, cancelSub))
    return () => subscription.unsubscribe()
  }

export const CreateSubscriptions: FC<CreateSubscriptionsProps> = ({ subscriptionType, developerId, appId }) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const email = connectSession?.loginIdentity.email
  const [currentSub, setCurrentSub] = useState<Marketplace.SubscriptionModel | null>(null)
  const { register, watch, reset } = useForm<ToggleSubscribedForm>()

  const queryParams = objectToQuery({
    developerId,
    subscriptionType,
  })

  const [subscriptions, , , subscriptionsRefresh] = useReapitGet<Marketplace.SubscriptionModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getSubscriptions],
    queryParams: {
      ...queryParams,
      pageSize: 999,
    },
  })

  const [, , cancelSubscription, subscriptionCancelled] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.deleteSubscription],
    method: 'DELETE',
    uriParams: {
      subscriptionId: currentSub?.id,
    },
  })

  const [, , createSubscription, subscriptionCreated] = useReapitUpdate<Marketplace.CreateSubscriptionModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.createSubscription],
    method: 'POST',
  })

  const shouldRefresh = subscriptionCancelled || subscriptionCreated
  const createSub = createSubscriptionHander(createSubscription, {
    developerId,
    applicationId: appId,
    user: email,
    type: subscriptionType,
  })
  const cancelSub = cancelSubscriptionHander(cancelSubscription)

  useEffect(getCurrentSub(subscriptions, subscriptionType, setCurrentSub, reset, appId), [
    subscriptions,
    subscriptionType,
    appId,
  ])
  useEffect(handleRefreshSubs(subscriptionsRefresh, shouldRefresh), [subscriptionCancelled, subscriptionCreated])
  useEffect(handleWatchToggle(createSub, cancelSub, watch), [subscriptions, currentSub])

  return (
    <form>
      <FormLayout className={elMt5}>
        <InputWrap>
          <Label>
            Is Subscribed {subscriptionType === 'applicationListing' ? 'Application Listing' : 'Developer Registration'}
          </Label>
          <ToggleRadio
            {...register('isSubscribed')}
            hasGreyBg
            options={[
              {
                id: `option-subscribed-true-${uuid()}`,
                value: 'SUBSCRIBED',
                text: 'Subscribed',
                isChecked: Boolean(currentSub),
              },
              {
                id: `option-subscribed-false-${uuid()}`,
                value: 'NOT_SUBSCRIBED',
                text: 'Not Subscribed',
                isChecked: currentSub === null,
              },
            ]}
          />
        </InputWrap>
      </FormLayout>
    </form>
  )
}
