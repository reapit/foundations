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
import { UseFormRegister } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Dispatch as ReduxDispatch } from 'redux'
import { fetchWebhooksTopics } from '../../../actions/webhooks-topics'
import { TopicModel } from '../../../services/webhooks'
import { searchMinWidth } from './__styles__/index'
import { CreateWebhookFormSchema } from './webhooks-new'
import { selectWebhookSubscriptionTopics } from '../../../selector/webhooks-subscriptions'

interface WebhooksNewTopicsProps {
  register: UseFormRegister<CreateWebhookFormSchema>
}

export const handleFetchTopics =
  (dispatch: ReduxDispatch, isLoading: boolean, applicationId?: string, topics?: TopicModel[]) => () => {
    if (topics?.length || isLoading) return

    dispatch(fetchWebhooksTopics({ applicationId, pageNumber: 1 }))
  }

export const handleSearchTopics =
  (
    topics: TopicModel[],
    setFilteredTopics: Dispatch<SetStateAction<TopicModel[]>>,
    setSearch: Dispatch<SetStateAction<string>>,
  ) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value
    const filteredTopics = search ? topics.filter((topic) => (topic.name ?? '').includes(search)) : []
    setSearch(search)
    setFilteredTopics(filteredTopics)
  }

export const WebhooksNewTopics: FC<WebhooksNewTopicsProps> = ({ register }) => {
  const [filteredTopics, setFilteredTopics] = useState<TopicModel[]>([])
  const [search, setSearch] = useState<string>('')
  const topics = useSelector(selectWebhookSubscriptionTopics)
  const multiSelectOptions = filteredTopics.map((topic) => ({ name: topic.name ?? '', value: topic.id ?? '' }))

  console.log(multiSelectOptions)
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
            onChange={handleSearchTopics(topics, setFilteredTopics, setSearch)}
            icon="searchSystem"
            placeholder="Search"
          />
        </FlexContainer>
        <MultiSelectInput
          className={elMb7}
          id="topic-ids"
          hasGreyChips
          deselectedOptions={multiSelectOptions}
          {...register('topicIds')}
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
