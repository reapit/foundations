import {
  BodyText,
  InputGroup,
  MultiSelectInput,
  FormLayout,
  InputWrapMed,
  elFadeIn,
  elMb5,
  elMb11,
} from '@reapit/elements'
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import { DeepMap, FieldError, UseFormGetValues, UseFormRegister } from 'react-hook-form'
import { TopicModel } from '../../types/webhooks'
import { CreateWebhookFormSchema } from './webhooks-new'
import { getInitialTopics } from './webhooks-manage-form'
import { useWebhooksState } from './state/use-webhooks-state'

interface WebhooksNewTopicsProps {
  register: UseFormRegister<CreateWebhookFormSchema>
  getValues: UseFormGetValues<CreateWebhookFormSchema>
  errors: DeepMap<Partial<CreateWebhookFormSchema>, FieldError>
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

    const selectedTopics = getValues().topicIds?.split(',').filter(Boolean)

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
  const { webhooksDataState } = useWebhooksState()
  const [search, setSearch] = useState<string>('')
  const selectedTopics = getValues().topicIds?.split(',').filter(Boolean)
  const { topics } = webhooksDataState
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
    <>
      <div className={elMb11}>
        <BodyText hasNoMargin hasGreyText>
          Select topics for your webhook from the list below to allow your application to receive real-time
          notifications about the topics you choose to subscribe to. A single webhook subscription can receive
          notifications for multiple topics so long as your application has been granted the required permissions.
        </BodyText>
      </div>
      <FormLayout className={elFadeIn}>
        <InputWrapMed>
          <InputGroup
            className={elMb5}
            label="Subscription Topics"
            onChange={handleSearchTopics(topics, getValues, setFilteredTopics, setSearch)}
            icon="search"
            placeholder="Search"
            inputAddOnText={inputAddOnText}
            intent={errors.topicIds && search ? 'danger' : 'low'}
          />
          <MultiSelectInput
            id="topic-ids"
            defaultValues={selectedTopics}
            options={multiSelectOptions}
            {...register('topicIds')}
          />
        </InputWrapMed>
      </FormLayout>
    </>
  )
}
