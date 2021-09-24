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
import { webhookItemDataStub } from '../../../../sagas/__stubs__/webhook-edit'
import { TopicModel } from '../../../../services/webhooks'
import { UseFormGetValues } from 'react-hook-form'
import { render } from '../../../../tests/react-testing'
import {
  deleteWebhook,
  editWebhook,
  EditWebhookParams,
  updateWebhookCreateEditState,
} from '../../../../actions/webhooks-subscriptions'
import { WebhookCreateEditState } from '../../../../reducers/webhooks-subscriptions/webhook-edit-modal'
import { ExpandableContentType } from '../webhooks-manage'

describe('WebhooksManageForm', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <WebhooksManageForm
          webhookModel={webhookItemDataStub}
          setIndexExpandedRow={jest.fn()}
          setExpandableContentType={jest.fn()}
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
    const dispatch = jest.fn()
    const values = {
      topicIds: 'SOME_ID',
      url: 'https://example.com',
      customerIds: '',
      ignoreEtagOnlyChanges: false,
      active: true,
    }
    const editWebhookParams: EditWebhookParams = {
      ...values,
      applicationId: webhookItemDataStub.applicationId,
      webhookId: webhookItemDataStub.id,
      topicIds: values.topicIds.split(','),
      customerIds: values.customerIds.split(','),
    }
    const curried = handleSubmitWebhook(dispatch, webhookItemDataStub)
    curried(values)
    expect(dispatch).toHaveBeenCalledWith(updateWebhookCreateEditState(WebhookCreateEditState.LOADING))
    expect(dispatch).toHaveBeenLastCalledWith(editWebhook(editWebhookParams))
  })
})

describe('handleWebhookEditing', () => {
  it('should handle a successful edit state', () => {
    const success = jest.fn()
    const error = jest.fn()
    const webhookCreateEditState = WebhookCreateEditState.SUCCESS
    const dispatch = jest.fn()
    const setIndexExpandedRow = jest.fn()
    const setExpandableContentType = jest.fn()

    const curried = handleWebhookEditing(
      success,
      error,
      webhookCreateEditState,
      dispatch,
      setIndexExpandedRow,
      setExpandableContentType,
    )
    curried()

    expect(success).toHaveBeenCalledWith('Webhook was successfully updated')
    expect(error).not.toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(updateWebhookCreateEditState(WebhookCreateEditState.INITIAL))
    expect(setIndexExpandedRow).toHaveBeenCalledWith(null)
    expect(setExpandableContentType).toHaveBeenCalledWith(ExpandableContentType.Controls)
  })

  it('should handle a failed edit state', () => {
    const success = jest.fn()
    const error = jest.fn()
    const webhookCreateEditState = WebhookCreateEditState.ERROR
    const dispatch = jest.fn()
    const setIndexExpandedRow = jest.fn()
    const setExpandableContentType = jest.fn()

    const curried = handleWebhookEditing(
      success,
      error,
      webhookCreateEditState,
      dispatch,
      setIndexExpandedRow,
      setExpandableContentType,
    )
    curried()

    expect(success).not.toHaveBeenCalled()
    expect(error).toHaveBeenCalledWith('Webhook failed to update, check the details supplied and try again')
    expect(dispatch).toHaveBeenCalledWith(updateWebhookCreateEditState(WebhookCreateEditState.INITIAL))
    expect(setIndexExpandedRow).not.toHaveBeenCalled()
    expect(setExpandableContentType).not.toHaveBeenCalled()
  })
})

describe('handleWebhookDelete', () => {
  it('should handle webhook deleting', () => {
    const dispatch = jest.fn()
    const closeModal = jest.fn()

    const curried = handleWebhookDelete(dispatch, webhookItemDataStub, closeModal)
    curried()

    expect(closeModal).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(
      deleteWebhook({ webhookId: webhookItemDataStub.id, applicationId: webhookItemDataStub.applicationId }),
    )
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
