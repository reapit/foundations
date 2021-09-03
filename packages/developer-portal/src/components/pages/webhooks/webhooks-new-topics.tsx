import {
  BodyText,
  ColSplit,
  elMb11,
  FlexContainer,
  Grid,
  InputGroup,
  MultiSelect,
  MultiSelectChip,
  PersistantNotification,
  Subtitle,
} from '@reapit/elements'
import React, { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Control, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch as ReduxDispatch } from 'redux'
import { CreateWebhookParams } from '../../../actions/webhooks-subscriptions'
import { fetchWebhooksTopics } from '../../../actions/webhooks-topics'
import { selectTopicsData, selectTopicsLoading } from '../../../selector/webhooks-topics'
import { TopicModel } from '../../../services/webhooks'
import { searchMinWidth } from './__styles__/index'

interface WebhooksNewTopicsProps {
  control: Control<CreateWebhookParams, object>
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

export const handleSelectedTopics =
  (topicId: string, onChange: (...event: any[]) => void, topicIds: string[]) =>
  (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked
    const newIds = isChecked ? [...topicIds, topicId] : topicIds.filter((id) => id !== topicId)
    const value = [...new Set(newIds)]

    onChange({ target: { value } })
  }

export const WebhooksNewTopics: FC<WebhooksNewTopicsProps> = ({ control }) => {
  const dispatch = useDispatch()
  const [filteredTopics, setFilteredTopics] = useState<TopicModel[]>([])
  const [search, setSearch] = useState<string>('')
  const topics = useSelector(selectTopicsData)
  const isLoading = useSelector(selectTopicsLoading)

  const applicationId: string | undefined = control._formValues.applicationId

  useEffect(handleFetchTopics(dispatch, isLoading, applicationId, topics), [applicationId, topics])

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
        <FlexContainer isFlexAlignCenter isFlexJustifyBetween isFlexWrap>
          <Subtitle hasNoMargin>Subscription topics</Subtitle>
          <InputGroup
            className={searchMinWidth}
            onChange={handleSearchTopics(topics, setFilteredTopics, setSearch)}
            icon="searchSystem"
            placeholder="Search"
          />
        </FlexContainer>
        <Controller
          control={control}
          name="topicIds"
          render={({ field: { onChange, value: topicIds = [] } }) => {
            return (
              <MultiSelect>
                {filteredTopics.map((topic) => (
                  <MultiSelectChip
                    onChange={handleSelectedTopics(topic.id ?? '', onChange, topicIds)}
                    key={topic.id}
                    id={topic.id}
                    defaultChecked={topicIds.includes(topic.id ?? '')}
                  >
                    {topic.name}
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
