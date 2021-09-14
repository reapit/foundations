import {
  BodyText,
  ColSplit,
  elMb11,
  FlexContainer,
  Grid,
  InputGroup,
  PersistantNotification,
  Subtitle,
  MultiSelectInput,
  elMb7,
} from '@reapit/elements'
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import { UseFormGetValues, UseFormRegister } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Dispatch as ReduxDispatch } from 'redux'
import { fetchWebhooksTopics } from '../../../actions/webhooks-topics'
import { TopicModel } from '../../../services/webhooks'
import { searchMinWidth } from './__styles__/index'
import { CreateWebhookFormSchema } from './webhooks-new'
import { selectWebhookSubscriptionTopics } from '../../../selector/webhooks-subscriptions'
import { getInitialTopics } from './webhooks-manage-form'

interface WebhooksNewTopicsProps {
  register: UseFormRegister<CreateWebhookFormSchema>
  getValues: UseFormGetValues<CreateWebhookFormSchema>
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

export const WebhooksNewTopics: FC<WebhooksNewTopicsProps> = ({ register, getValues }) => {
  const [search, setSearch] = useState<string>('')
  const topics = useSelector(selectWebhookSubscriptionTopics)
  const selectedTopics = getValues().topicIds?.split(',')
  const [filteredTopics, setFilteredTopics] = useState<TopicModel[]>(getInitialTopics(topics, selectedTopics))
  const multiSelectOptions = filteredTopics.map((topic) => ({ name: topic.name ?? '', value: topic.id ?? '' }))

  return (
    <Grid>
      <ColSplit>
        <div className={elMb11}>
          <BodyText hasNoMargin hasGreyText>
            Select topics for your webhook from the list below to allow your application to receive real-time
            notifications about the topics you choose to subscribe to. A single webhook subscription can receive
            notifications for multiple topics so long as your application has been granted the required permissions.
          </BodyText>
        </div>
        <FlexContainer className={elMb7} isFlexAlignCenter isFlexJustifyBetween isFlexWrap>
          <Subtitle hasNoMargin>Subscription topics</Subtitle>
          <InputGroup
            className={searchMinWidth}
            onChange={handleSearchTopics(topics, getValues, setFilteredTopics, setSearch)}
            icon="searchSystem"
            placeholder="Search"
          />
        </FlexContainer>
        <MultiSelectInput
          className={elMb7}
          id="topic-ids"
          hasGreyChips
          defaultValues={selectedTopics}
          options={multiSelectOptions}
          {...register('topicIds')}
        />
        {(!filteredTopics.length || filteredTopics.length === selectedTopics.length) && search && (
          <PersistantNotification isFullWidth isExpanded intent="secondary" isInline>
            No topics found for your search. We only show topics that are relevant to the scopes of your selected
            application.
          </PersistantNotification>
        )}
        {!filteredTopics.length && !search && (
          <PersistantNotification isFullWidth isExpanded intent="secondary" isInline>
            You need to enter a search to get started.
          </PersistantNotification>
        )}
      </ColSplit>
    </Grid>
  )
}
