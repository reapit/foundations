import React, { ChangeEvent } from 'react'
import {
  EditWebhookFormSchema,
  handleCollapseRow,
  handleSearchTopics,
  handleSubmitWebhook,
  handleWebhookDelete,
  handleWebhookEditing,
  WebhooksManageForm,
} from '../webhooks-manage-form'
import { TopicModel, UpdateWebhookModel } from '../../../types/webhooks'
import { UseFormGetValues } from 'react-hook-form'
import { render } from '../../../tests/react-testing'
import { ExpandableContentType } from '../webhooks-manage'
import { mockWebhookModel } from '../../../tests/__stubs__/webhooks'

jest.mock('../state/use-webhooks-state')

describe('WebhooksManageForm', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <WebhooksManageForm
          webhookModel={mockWebhookModel}
          setIndexExpandedRow={jest.fn()}
          setExpandableContentType={jest.fn()}
          refreshSubscriptions={jest.fn()}
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

describe('handleSubmitWebhook', () => {
  it('should handle the form submit', () => {
    const updateWebhook = jest.fn()
    const values = {
      topicIds: 'SOME_ID',
      url: 'https://example.com',
      customerIds: '',
      ignoreEtagOnlyChanges: false,
      active: true,
      extraFields: 'a,b,c',
    }
    const editWebhookParams: UpdateWebhookModel = {
      ...values,
      topicIds: values.topicIds.split(',').filter(Boolean),
      extraFields: ['a', 'b', 'c'],
      customerIds: values.customerIds.split(',').filter(Boolean),
    }
    const curried = handleSubmitWebhook(updateWebhook, mockWebhookModel)
    curried(values)
    expect(updateWebhook).toHaveBeenLastCalledWith(editWebhookParams)
  })
})

describe('handleWebhookEditing', () => {
  it('should handle a successful edit state', () => {
    const setIndexExpandedRow = jest.fn()
    const setExpandableContentType = jest.fn()
    const refreshSubscriptions = jest.fn()
    const updateWebhookSuccess = true
    const deleteWebhookSuccess = false

    const curried = handleWebhookEditing(
      setIndexExpandedRow,
      setExpandableContentType,
      refreshSubscriptions,
      updateWebhookSuccess,
      deleteWebhookSuccess,
    )
    curried()

    expect(setIndexExpandedRow).toHaveBeenCalledWith(null)
    expect(setExpandableContentType).toHaveBeenCalledWith(ExpandableContentType.Controls)
    expect(refreshSubscriptions).toHaveBeenCalledTimes(1)
  })

  it('should handle a successful delete state', () => {
    const setIndexExpandedRow = jest.fn()
    const setExpandableContentType = jest.fn()
    const refreshSubscriptions = jest.fn()
    const updateWebhookSuccess = false
    const deleteWebhookSuccess = true

    const curried = handleWebhookEditing(
      setIndexExpandedRow,
      setExpandableContentType,
      refreshSubscriptions,
      updateWebhookSuccess,
      deleteWebhookSuccess,
    )
    curried()

    expect(setIndexExpandedRow).toHaveBeenCalledWith(null)
    expect(setExpandableContentType).toHaveBeenCalledWith(ExpandableContentType.Controls)
    expect(refreshSubscriptions).toHaveBeenCalledTimes(1)
  })

  it('should handle a failed edit state', () => {
    const setIndexExpandedRow = jest.fn()
    const setExpandableContentType = jest.fn()
    const refreshSubscriptions = jest.fn()
    const updateWebhookSuccess = false
    const deleteWebhookSuccess = false

    const curried = handleWebhookEditing(
      setIndexExpandedRow,
      setExpandableContentType,
      refreshSubscriptions,
      updateWebhookSuccess,
      deleteWebhookSuccess,
    )
    curried()

    expect(setIndexExpandedRow).not.toHaveBeenCalled()
    expect(setExpandableContentType).not.toHaveBeenCalled()
    expect(refreshSubscriptions).not.toHaveBeenCalled()
  })
})

describe('handleWebhookDelete', () => {
  it('should handle webhook deleting', () => {
    const deleteWebhook = jest.fn()
    const closeModal = jest.fn()

    const curried = handleWebhookDelete(deleteWebhook, closeModal)
    curried()

    expect(closeModal).toHaveBeenCalled()
    expect(deleteWebhook).toHaveBeenCalledWith(undefined)
  })
})

describe('handleCollapseRow', () => {
  it('should handle row collapse', () => {
    const setIndexExpandedRow = jest.fn()
    const setExpandableContentType = jest.fn()

    const curried = handleCollapseRow(setIndexExpandedRow, setExpandableContentType)
    curried()

    expect(setExpandableContentType).toHaveBeenCalledWith(ExpandableContentType.Controls)
    expect(setIndexExpandedRow).toHaveBeenCalledWith(null)
  })
})
