import React from 'react'
import { handlePingWebhook, handleWebhookPing, WebhooksPingForm } from '../webhook-ping-form'
import { webhookItemDataStub } from '../../../../sagas/__stubs__/webhook-edit'
import { updateWebhookCreateEditState } from '../../../../actions/webhooks-subscriptions'
import { WebhookCreateEditState } from '../../../../reducers/webhooks-subscriptions/webhook-edit-modal'
import { developerSetWebhookPingStatus, developerWebhookPing } from '../../../../actions/developer'
import { render } from '../../../../tests/react-testing'

describe('WebhooksPingForm', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <WebhooksPingForm
          webhookModel={webhookItemDataStub}
          setIndexExpandedRow={jest.fn()}
          setExpandableContentSize={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleWebhookPing', () => {
  it('should call the correct handlers when status is SUCCESS', () => {
    const success = jest.fn()
    const dispatch = jest.fn()
    const setIndexExpandedRow = jest.fn()
    const setExpandableContentSize = jest.fn()
    const setWebhookPingId = jest.fn()
    const openModal = jest.fn()
    const webhookPingTestStatus = 'SUCCESS'
    const webhookPingId = 'SOME_ID'

    const curried = handleWebhookPing(
      success,
      dispatch,
      setIndexExpandedRow,
      setExpandableContentSize,
      setWebhookPingId,
      openModal,
      webhookPingTestStatus,
      webhookPingId,
    )

    curried()

    expect(success).toHaveBeenCalledWith('Webhook was successfully pinged')
    expect(dispatch).toHaveBeenCalledWith(updateWebhookCreateEditState(WebhookCreateEditState.INITIAL))
    expect(setIndexExpandedRow).toHaveBeenCalledWith(null)
    expect(setExpandableContentSize).toHaveBeenCalledWith('small')
    expect(setWebhookPingId).toHaveBeenCalledWith(null)
    expect(dispatch).toHaveBeenLastCalledWith(developerSetWebhookPingStatus(null))
    expect(openModal).not.toHaveBeenCalled()
  })

  it('should call the correct handlers when status is FAILED', () => {
    const success = jest.fn()
    const dispatch = jest.fn()
    const setIndexExpandedRow = jest.fn()
    const setExpandableContentSize = jest.fn()
    const setWebhookPingId = jest.fn()
    const openModal = jest.fn()
    const webhookPingTestStatus = 'FAILED'
    const webhookPingId = 'SOME_ID'

    const curried = handleWebhookPing(
      success,
      dispatch,
      setIndexExpandedRow,
      setExpandableContentSize,
      setWebhookPingId,
      openModal,
      webhookPingTestStatus,
      webhookPingId,
    )

    curried()

    expect(success).not.toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(developerSetWebhookPingStatus(null))
    expect(setIndexExpandedRow).not.toHaveBeenCalled()
    expect(setExpandableContentSize).not.toHaveBeenCalled()
    expect(setWebhookPingId).toHaveBeenCalledWith(null)
    expect(openModal).toHaveBeenCalled()
  })
})

describe('handlePingWebhook', () => {
  it('should call the correct handlers to ping a webhook', () => {
    const setWebhookPingId = jest.fn()
    const dispatch = jest.fn()
    const values = {
      topicId: 'SOME_ID',
    }

    const curried = handlePingWebhook(webhookItemDataStub, dispatch, setWebhookPingId)

    curried(values)

    expect(setWebhookPingId).toHaveBeenCalledWith(webhookItemDataStub.id)
    expect(dispatch).toHaveBeenCalledWith(
      developerWebhookPing({
        id: webhookItemDataStub.id,
        topicId: values.topicId,
      }),
    )
  })
})
