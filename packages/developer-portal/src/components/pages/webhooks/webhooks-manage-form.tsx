import {
  ColSplit,
  elMb7,
  elMt1,
  elToggleItem,
  FlexContainer,
  Grid,
  InputGroup,
  Label,
  MultiSelectInput,
  MultiSelectOption,
  Subtitle,
  Toggle,
} from '@reapit/elements'
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useMemo, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { boolean, object, string } from 'yup'
import errorMessages from '../../../constants/error-messages'
import { httpsUrlRegex } from '@reapit/utils'
import { useForm } from 'react-hook-form'

import { Dispatch as ReduxDispatch } from 'redux'
import { editWebhook, EditWebhookParams, updateWebhookCreateEditState } from '../../../actions/webhooks-subscriptions'
import { WebhookCreateEditState } from '../../../reducers/webhooks-subscriptions/webhook-edit-modal'
import { useDispatch, useSelector } from 'react-redux'
import { TopicModel, WebhookModel } from '../../../services/webhooks'
import { searchMinWidth } from './__styles__'
import { selectCustomers, selectWebhookSubscriptionTopics } from '../../../selector/webhooks-subscriptions'
import { handleCustomersToOptions } from './webhooks-new-customers'

interface WebhooksManageFormProps {
  webhookModel: WebhookModel
}

export interface EditWebhookFormSchema {
  url: string
  topicIds: string
  customerIds: string
  ignoreEtagOnlyChanges: boolean
  active: boolean
}

const schema = object().shape<EditWebhookFormSchema>({
  url: string().trim().required(errorMessages.FIELD_REQUIRED).matches(httpsUrlRegex, 'Should be a secure https url'),
  topicIds: string(),
  customerIds: string(),
  ignoreEtagOnlyChanges: boolean(),
  active: boolean(),
})

export const handleSearchTopics =
  (topics: TopicModel[], setFilteredTopics: Dispatch<SetStateAction<TopicModel[]>>) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value
    const filteredTopics = search
      ? topics.filter((topic) => (topic.name?.toLowerCase() ?? '').includes(search.toLowerCase()))
      : []
    setFilteredTopics(filteredTopics)
  }

export const handleSubmitWebhook =
  (dispatch: ReduxDispatch, webhookModel: WebhookModel) => (values: EditWebhookFormSchema) => {
    const { id: webhookId, applicationId } = webhookModel
    const { url, topicIds, customerIds, ignoreEtagOnlyChanges, active } = values

    if (!webhookId || !applicationId) return

    const editWebhookParams: EditWebhookParams = {
      webhookId,
      applicationId,
      url,
      topicIds: topicIds.split(','),
      customerIds: customerIds.split(','),
      ignoreEtagOnlyChanges,
      active,
    }
    dispatch(updateWebhookCreateEditState(WebhookCreateEditState.LOADING))
    dispatch(editWebhook(editWebhookParams))
  }

export const handleSelectedDeselected =
  (
    customerOptions: MultiSelectOption[],
    topicOptions: MultiSelectOption[],
    customerIds: string[],
    topicIds: string[],
  ) =>
  () => {
    const selectedTopics: MultiSelectOption[] = []
    const deselectedTopics: MultiSelectOption[] = []
    const selectedCustomers: MultiSelectOption[] = []
    const deselectedCustomers: MultiSelectOption[] = []

    customerOptions.forEach((option) => {
      if (customerIds.includes(option.value)) {
        selectedCustomers.push(option)
        return
      }
      deselectedCustomers.push(option)
    })

    topicOptions.forEach((option) => {
      if (topicIds.includes(option.value)) {
        selectedTopics.push(option)
        return
      }
      deselectedTopics.push(option)
    })

    return {
      selectedCustomers,
      deselectedCustomers,
      selectedTopics,
      deselectedTopics,
    }
  }

export const WebhooksManageForm: FC<WebhooksManageFormProps> = ({ webhookModel }) => {
  const dispatch = useDispatch()
  const [filteredTopics, setFilteredTopics] = useState<TopicModel[]>([])
  const topics = useSelector(selectWebhookSubscriptionTopics)
  const customers = useSelector(selectCustomers)
  const { id, url, topicIds, customerIds, ignoreEtagOnlyChanges, active } = webhookModel
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditWebhookFormSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      url,
      topicIds: topicIds?.toString(),
      customerIds: customerIds?.toString(),
      ignoreEtagOnlyChanges,
      active,
    },
  })

  const customerOptions = useMemo(handleCustomersToOptions(customers), [customers])
  const topicOptions = filteredTopics.map((topic) => ({ name: topic.name ?? '', value: topic.id ?? '' }))
  const topicsCustomers = useMemo(
    handleSelectedDeselected(customerOptions, topicOptions, customerIds ?? [], topicIds ?? []),
    [customerOptions, topicOptions, customerIds, topicIds],
  )

  return (
    <form onSubmit={handleSubmit(handleSubmitWebhook(dispatch, webhookModel))}>
      <Subtitle>Edit Webhook</Subtitle>
      <InputGroup
        placeholder="Enter secure https:// url"
        label="Webhook URL"
        {...register('url')}
        inputAddOnText={errors?.url?.message}
        intent="danger"
      />
      <Grid>
        <ColSplit>
          <FlexContainer className={elMb7} isFlexAlignCenter isFlexJustifyBetween isFlexWrap>
            <Label>Subscription topics</Label>
            <InputGroup
              className={searchMinWidth}
              onChange={handleSearchTopics(topics, setFilteredTopics)}
              icon="searchSystem"
              placeholder="Search"
            />
          </FlexContainer>
          <MultiSelectInput
            className={elMb7}
            id={`topic-edit-ids-${id}`}
            hasGreyChips
            deselectedOptions={topicsCustomers.deselectedTopics}
            selectedOptions={topicsCustomers.selectedTopics}
            {...register('topicIds')}
          />
          <Label>Subscription customers</Label>
          <MultiSelectInput
            className={elMb7}
            id={`customer-edit-ids-${id}`}
            hasGreyChips
            deselectedOptions={topicsCustomers.deselectedCustomers}
            selectedOptions={topicsCustomers.selectedCustomers}
            {...register('customerIds')}
          />
        </ColSplit>
        <ColSplit>
          <Grid>
            <ColSplit>
              <Label>Status</Label>
              <Toggle className={elMt1} id={`status-edit-toggle-${id}`} hasGreyBg isFullWidth {...register('active')}>
                <span className={elToggleItem}>Active</span>
                <span className={elToggleItem}>Inactive</span>
              </Toggle>
            </ColSplit>
          </Grid>
          <InputGroup
            type="checkbox"
            label="Ignore where only the etag has been modified"
            inputAddOnText="Ignore"
            {...register('ignoreEtagOnlyChanges')}
          />
        </ColSplit>
      </Grid>
    </form>
  )
}
