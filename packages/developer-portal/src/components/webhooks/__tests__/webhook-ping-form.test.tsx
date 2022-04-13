import React from 'react'
import { handlePingWebhook, handleWebhookPing, WebhooksPingForm } from '../webhook-ping-form'
import { render } from '../../../tests/react-testing'
import { ExpandableContentType } from '../webhooks-manage'
import { mockWebhookModel } from '../../../tests/__stubs__/webhooks'

jest.mock('../state/use-webhooks-state')

describe('WebhooksPingForm', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <WebhooksPingForm
          webhookModel={mockWebhookModel}
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
    const openModal = jest.fn()

    const curried = handleWebhookPing(setIndexExpandedRow, setExpandableContentType, openModal, null, true)

    curried()
    expect(setIndexExpandedRow).toHaveBeenCalledWith(null)
    expect(setExpandableContentType).toHaveBeenCalledWith(ExpandableContentType.Controls)
    expect(openModal).not.toHaveBeenCalled()
  })

  it('should call the correct handlers when ping fails', () => {
    const setIndexExpandedRow = jest.fn()
    const setExpandableContentType = jest.fn()
    const openModal = jest.fn()

    const curried = handleWebhookPing(
      setIndexExpandedRow,
      setExpandableContentType,
      openModal,
      'Something went wrong',
      false,
    )

    curried()
    expect(setIndexExpandedRow).not.toHaveBeenCalled()
    expect(setExpandableContentType).not.toHaveBeenCalled()
    expect(openModal).toHaveBeenCalledTimes(1)
  })
})

describe('handlePingWebhook', () => {
  it('should call the correct handlers to ping a webhook', () => {
    const pingWebhook = jest.fn()
    const values = {
      topicId: 'SOME_ID',
    }

    const curried = handlePingWebhook(mockWebhookModel, pingWebhook)

    curried(values)

    expect(pingWebhook).toHaveBeenCalledWith({
      topicId: values.topicId,
    })
  })
})
