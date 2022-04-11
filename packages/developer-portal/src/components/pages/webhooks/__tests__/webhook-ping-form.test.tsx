import React from 'react'
import { handlePingWebhook, handleWebhookPing, WebhooksPingForm } from '../webhook-ping-form'
import { webhookItemDataStub } from '../../../../sagas/__stubs__/webhook-edit'
import { render } from '../../../../tests/react-testing'
import { ExpandableContentType } from '../webhooks-manage'

describe('WebhooksPingForm', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <WebhooksPingForm
          webhookModel={webhookItemDataStub}
          setIndexExpandedRow={jest.fn()}
          setExpandableContentType={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleWebhookPing', () => {
  it('should call the correct handlers when ping is successful', () => {
    const setIndexExpandedRow = jest.fn()
    const setExpandableContentType = jest.fn()
    const setWebhookPingId = jest.fn()
    const openModal = jest.fn()
    const webhookPingId = 'SOME_ID'

    const curried = handleWebhookPing(
      setIndexExpandedRow,
      setExpandableContentType,
      setWebhookPingId,
      openModal,
      webhookPingId,
      null,
      true,
    )

    curried()
    expect(setIndexExpandedRow).toHaveBeenCalledWith(null)
    expect(setExpandableContentType).toHaveBeenCalledWith(ExpandableContentType.Controls)
    expect(setWebhookPingId).toHaveBeenCalledWith(null)
    expect(openModal).not.toHaveBeenCalled()
  })

  it('should call the correct handlers when ping fails', () => {
    const setIndexExpandedRow = jest.fn()
    const setExpandableContentType = jest.fn()
    const setWebhookPingId = jest.fn()
    const openModal = jest.fn()
    const webhookPingId = 'SOME_ID'

    const curried = handleWebhookPing(
      setIndexExpandedRow,
      setExpandableContentType,
      setWebhookPingId,
      openModal,
      webhookPingId,
      'Something went wrong',
      false,
    )

    curried()
    expect(setIndexExpandedRow).not.toHaveBeenCalled()
    expect(setExpandableContentType).not.toHaveBeenCalled()
    expect(setWebhookPingId).toHaveBeenCalledWith(null)
    expect(openModal).toHaveBeenCalledTimes(1)
  })
})

describe('handlePingWebhook', () => {
  it('should call the correct handlers to ping a webhook', () => {
    const setWebhookPingId = jest.fn()
    const pingWebhook = jest.fn()
    const values = {
      topicId: 'SOME_ID',
    }

    const curried = handlePingWebhook(webhookItemDataStub, pingWebhook, setWebhookPingId)

    curried(values)

    expect(setWebhookPingId).toHaveBeenCalledWith(webhookItemDataStub.id)
    expect(pingWebhook).toHaveBeenCalledWith({
      id: webhookItemDataStub.id,
      topicId: values.topicId,
    })
  })
})
