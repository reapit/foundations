import {
  BodyText,
  elMb11,
  InputGroup,
  MultiSelectInput,
  FormLayout,
  InputWrapFull,
  InputWrapMed,
  elFadeIn,
} from '@reapit/elements'
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import { DeepMap, FieldError, UseFormGetValues, UseFormRegister } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Dispatch as ReduxDispatch } from 'redux'
import { fetchWebhooksTopics } from '../../../actions/webhooks-topics'
import { TopicModel } from '../../../services/webhooks'
import { CreateWebhookFormSchema } from './webhooks-new'
import { selectWebhookSubscriptionTopics } from '../../../selector/webhooks-subscriptions'
import { getInitialTopics } from './webhooks-manage-form'
import { cx } from '@linaria/core'

interface WebhooksNewTopicsProps {
  register: UseFormRegister<CreateWebhookFormSchema>
  getValues: UseFormGetValues<CreateWebhookFormSchema>
  errors: DeepMap<CreateWebhookFormSchema, FieldError>
}

export const handleFetchTopics =
  (dispatch: ReduxDispatch, isLoading: boolean, applicationId?: string, topics?: TopicModel[]) => () => {
    if (topics?.length || isLoading) return

    dispatch(fetchWebhooksTopics({ applicationId, pageNumber: 1 }))
  }

export const handleSearchTopics =
  (
    topics: TopicModel[],
    getValues: UseFormGetValues<CreateWebhookFormSchema>,
    setFilteredTopics: Dispatch<SetStateAction<TopicModel[]>>,
    setSearch: Dispatch<SetStateAction<string>>,
  ) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value

    const selectedTopics = getValues().topicIds?.split(',')

    const filteredTopics = search
      ? topics.filter(
          (topic) =>
            (topic.name?.toLowerCase() ?? '').includes(search.toLowerCase()) ||
            selectedTopics?.includes(topic.id ?? ''),
        )
      : topics.filter((topic) => selectedTopics?.includes(topic.id ?? ''))
    setSearch(search)
    setFilteredTopics(filteredTopics)
  }

export const WebhooksNewTopics: FC<WebhooksNewTopicsProps> = ({ register, getValues, errors }) => {
  const [search, setSearch] = useState<string>('')
  const topics = useSelector(selectWebhookSubscriptionTopics)
  const selectedTopics = getValues().topicIds?.split(',')
  const [filteredTopics, setFilteredTopics] = useState<TopicModel[]>(getInitialTopics(topics, selectedTopics))
  const multiSelectOptions = filteredTopics.map((topic) => ({ name: topic.name ?? '', value: topic.id ?? '' }))
  const inputAddOnText =
    !filteredTopics.length && !search
      ? 'Search to get started'
      : (!filteredTopics.length || filteredTopics.length === selectedTopics.length) && search
      ? 'No topics found for your search.'
      : errors.topicIds && search
      ? errors.topicIds.message
      : ''

  return (
    <FormLayout className={cx(elFadeIn, elMb11)}>
      <InputWrapFull>
        <BodyText hasNoMargin hasGreyText>
          Select topics for your webhook from the list below to allow your application to receive real-time
          notifications about the topics you choose to subscribe to. A single webhook subscription can receive
          notifications for multiple topics so long as your application has been granted the required permissions.
        </BodyText>
      </InputWrapFull>
      <InputWrapMed>
        <InputGroup
          label="Subscription Topics"
          onChange={handleSearchTopics(topics, getValues, setFilteredTopics, setSearch)}
          icon="searchSystem"
          placeholder="Search"
          inputAddOnText={inputAddOnText}
          intent={errors.topicIds && search ? 'danger' : 'low'}
        />
      </InputWrapMed>
      <InputWrapFull>
        <MultiSelectInput
          id="topic-ids"
          defaultValues={selectedTopics}
          options={multiSelectOptions}
          {...register('topicIds')}
        />
      </InputWrapFull>
    </FormLayout>
  )
}
