import React, { useEffect, Dispatch, SetStateAction, useState, FC } from 'react'
import {
  CreateSubscriptionModel,
  SubscriptionModel,
  SubscriptionModelPagedResult,
} from '@reapit/foundations-ts-definitions'
import { objectToQuery, SendFunction, useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/utils-common'
import { elMt5, FormLayout, InputWrap, Label, ToggleRadio } from '@reapit/elements'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { useForm, UseFormWatch } from 'react-hook-form'

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
  const [currentSub, setCurrentSub] = useState<SubscriptionModel | null>(null)
  const { register, watch } = useForm<ToggleSubscribedForm>()

  const queryParams = objectToQuery({
    appId,
    developerId,
    subscriptionType,
  })

  const [subscriptions, , , subscriptionsRefresh] = useReapitGet<SubscriptionModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getSubscriptions],
    queryParams: {
      ...queryParams,
      pageSize: 999,
    },
  })

  const [, , cancelSubscription, subscriptionCancelled] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.deleteSubscription],
    method: 'DELETE',
    uriParams: {
      subscriptionId: currentSub?.id,
    },
  })

  const [, , createSubscription, subscriptionCreated] = useReapitUpdate<CreateSubscriptionModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.createSubscription],
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

  useEffect(getCurrentSub(subscriptions, subscriptionType, setCurrentSub), [subscriptions, subscriptionType])
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
                id: `option-subscribed-true-${appId}`,
                value: 'SUBSCRIBED',
                text: 'Subscribed',
                isChecked: Boolean(currentSub),
              },
              {
                id: `option-subscribed-false-${appId}`,
                value: 'NOT_SUBSCRIBED',
                text: 'Not Subscribed',
                isChecked: !currentSub,
              },
            ]}
          />
        </InputWrap>
      </FormLayout>
    </form>
  )
}
