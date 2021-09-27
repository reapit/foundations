import React, { ChangeEvent } from 'react'
import { handleFetchTopics, handleSearchTopics, WebhooksNewTopics } from '../webhooks-new-topics'
import { render } from '../../../../tests/react-testing'
import { CreateWebhookFormSchema } from '../webhooks-new'
import { UseFormGetValues } from 'react-hook-form'
import { TopicModel } from '../../../../services/webhooks'
import { fetchWebhooksTopics } from '../../../../actions/webhooks-topics'

describe('WebhooksNewTopics', () => {
  const getValues = jest.fn(() => ({
    topicIds: 'SOME_ID',
    url: 'https://example.com',
    customerIds: 'SOME_ID',
    ignoreEtagOnlyChanges: false,
    active: true,
  })) as unknown as UseFormGetValues<CreateWebhookFormSchema>

  it('should match a snapshot where there are topics', () => {
    expect(render(<WebhooksNewTopics register={jest.fn()} getValues={getValues} errors={{}} />)).toMatchSnapshot()
  })

  it('should match a snapshot where there are errors', () => {
    expect(
      render(
        <WebhooksNewTopics
          register={jest.fn()}
          getValues={getValues}
          errors={{ topicIds: { message: 'At lease one topic should be selected', type: 'error' } }}
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleSearchTopics', () => {
  it('should filter topics by the search', () => {
    const topics = [
      {
        name: 'SOME_NAME',
        id: 'SOME_ID',
      },
      {
        name: 'ANOTHER_NAME',
        id: 'ANOTHER_ID',
      },
    ] as TopicModel[]

    const getValues = jest.fn(() => ({
      topicIds: 'SOME_ID',
      url: 'https://example.com',
      customerIds: '',
      ignoreEtagOnlyChanges: false,
      active: true,
    })) as unknown as UseFormGetValues<CreateWebhookFormSchema>

    const setFilteredTopics = jest.fn()
    const setSearch = jest.fn()
    const curried = handleSearchTopics(topics, getValues, setFilteredTopics, setSearch)
    const event = {
      target: {
        value: 'SOME_ID',
      },
    } as ChangeEvent<HTMLInputElement>

    curried(event)

    expect(setFilteredTopics).toHaveBeenCalledWith([topics[0]])
    expect(setSearch).toHaveBeenCalledWith('SOME_ID')
  })

  it('should filter topics if there is no search', () => {
    const topics = [
      {
        name: 'SOME_NAME',
        id: 'SOME_ID',
      },
      {
        name: 'ANOTHER_NAME',
        id: 'ANOTHER_ID',
      },
    ] as TopicModel[]

    const getValues = jest.fn(() => ({
      topicIds: 'SOME_ID',
      url: 'https://example.com',
      customerIds: '',
      ignoreEtagOnlyChanges: false,
      active: true,
    })) as unknown as UseFormGetValues<CreateWebhookFormSchema>

    const setFilteredTopics = jest.fn()
    const setSearch = jest.fn()
    const curried = handleSearchTopics(topics, getValues, setFilteredTopics, setSearch)
    const event = {
      target: {
        value: '',
      },
    } as ChangeEvent<HTMLInputElement>

    curried(event)

    expect(setFilteredTopics).toHaveBeenCalledWith([topics[0]])
    expect(setSearch).toHaveBeenCalledWith('')
  })
})

describe('handleFetchTopics', () => {
  it('should fetch topics if not loading', () => {
    const dispatch = jest.fn()
    const curried = handleFetchTopics(dispatch, false, 'SOME_ID')
    curried()

    expect(dispatch).toHaveBeenCalledWith(fetchWebhooksTopics({ applicationId: 'SOME_ID', pageNumber: 1 }))
  })

  it('should not fetch topics if  loading', () => {
    const dispatch = jest.fn()
    const curried = handleFetchTopics(dispatch, true, 'SOME_ID')
    curried()

    expect(dispatch).not.toHaveBeenCalled()
  })
})
