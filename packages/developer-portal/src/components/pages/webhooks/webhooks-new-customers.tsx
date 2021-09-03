import {
  Grid,
  elMb11,
  BodyText,
  Subtitle,
  MultiSelect,
  MultiSelectChip,
  PersistantNotification,
} from '@reapit/elements'
import { ColSplit } from '@reapit/elements/src'
import React, { ChangeEvent, FC, useEffect } from 'react'
import { Control, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { CreateWebhookParams, fetchWebhooksSubscriptions } from '../../../actions/webhooks-subscriptions'
import { Dispatch as ReduxDispatch } from 'redux'
import { selectSubscriptionsData, selectSubscriptionsLoading } from '../../../selector/webhooks-subscriptions'
import { WebhookModel } from '@reapit/foundations-ts-definitions'

interface WebhooksNewCustomersProps {
  control: Control<CreateWebhookParams, object>
}

export const handleFetchSubscriptions =
  (dispatch: ReduxDispatch, isLoading: boolean, applicationId?: string, subscriptions?: WebhookModel[]) => () => {
    if (subscriptions?.length || isLoading) return

    dispatch(fetchWebhooksSubscriptions({ applicationId: [applicationId] as string[], pageNumber: 1 }))
  }

export const handleSelectedCustomers =
  (newCustomerIds: string[], onChange: (...event: any[]) => void, existingCustomerIds: string[]) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    const newIds = isChecked
      ? [...newCustomerIds, ...existingCustomerIds]
      : existingCustomerIds.filter((id) => !newCustomerIds.includes(id))
    const value = [...new Set(newIds)]

    onChange({ target: { value } })
  }

export const WebhooksNewCustomers: FC<WebhooksNewCustomersProps> = ({ control }) => {
  const dispatch = useDispatch()
  const subscriptionsData = useSelector(selectSubscriptionsData)
  const isLoading = useSelector(selectSubscriptionsLoading)

  const subscriptions = subscriptionsData?._embedded

  const applicationId: string | undefined = control._formValues.applicationId

  useEffect(handleFetchSubscriptions(dispatch, isLoading, applicationId, subscriptions), [applicationId, subscriptions])

  return (
    <Grid>
      <ColSplit>
        <div className={elMb11}>
          <BodyText hasNoMargin hasGreyText>
            Select topics for your webhook from the list below.
          </BodyText>
        </div>
        <Subtitle hasNoMargin>Subscription Customers</Subtitle>
        <Controller
          control={control}
          name="customerIds"
          render={({ field: { onChange, value: customerIds = [] } }) => {
            return (
              <MultiSelect>
                {subscriptions?.map((sub) => (
                  <MultiSelectChip
                    onChange={handleSelectedCustomers(sub.customerIds ?? [], onChange, customerIds)}
                    key={sub.id}
                    id={sub.id}
                    defaultChecked={customerIds.includes(sub.id ?? '')}
                  >
                    {sub.name}
                  </MultiSelectChip>
                ))}
              </MultiSelect>
            )
          }}
        />
        {!filteredTopics.length && search && (
          <PersistantNotification isFullWidth isExpanded intent="secondary" isInline>
            No topics found for your search. We only show topics that are relevant to the scopes of your selected
            application.
          </PersistantNotification>
        )}
        {!search && (
          <PersistantNotification isFullWidth isExpanded intent="secondary" isInline>
            You need to enter a search to get started.
          </PersistantNotification>
        )}
      </ColSplit>
    </Grid>
  )
}
