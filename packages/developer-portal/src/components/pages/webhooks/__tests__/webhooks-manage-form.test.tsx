import React, { ChangeEvent } from 'react'
import { shallow } from 'enzyme'
import { EditWebhookFormSchema, handleSearchTopics, WebhooksManageForm } from '../webhooks-manage-form'
import { webhookItemDataStub } from '../../../../sagas/__stubs__/webhook-edit'
import { ReduxState } from '../../../../types/core'
import configureStore from 'redux-mock-store'
import appState from '../../../../reducers/__stubs__/app-state'
import { Provider } from 'react-redux'
import { TopicModel } from '../../../../services/webhooks'
import { UseFormGetValues } from 'react-hook-form'

const mockState = {
  ...appState,
  // webhooksSubscriptions: {
  //   edit: webhookDataStub,
  // },
} as ReduxState

describe('WebhooksManageForm', () => {
  it('should match a snapshot', () => {
    const mockStore = configureStore()
    const store = mockStore(mockState)
    expect(
      shallow(
        <Provider store={store}>
          <WebhooksManageForm
            webhookModel={webhookItemDataStub}
            setIndexExpandedRow={jest.fn()}
            setExpandableContentSize={jest.fn()}
          />
        </Provider>,
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
    })) as unknown as UseFormGetValues<EditWebhookFormSchema>

    const setFilteredTopics = jest.fn()
    const curried = handleSearchTopics(topics, getValues, setFilteredTopics)
    const event = {
      target: {
        value: 'SOME_ID',
      },
    } as ChangeEvent<HTMLInputElement>

    curried(event)

    expect(setFilteredTopics).toHaveBeenCalledWith([topics[0]])
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
    })) as unknown as UseFormGetValues<EditWebhookFormSchema>

    const setFilteredTopics = jest.fn()
    const curried = handleSearchTopics(topics, getValues, setFilteredTopics)
    const event = {
      target: {
        value: '',
      },
    } as ChangeEvent<HTMLInputElement>

    curried(event)

    expect(setFilteredTopics).toHaveBeenCalledWith([topics[0]])
  })
})
