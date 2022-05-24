import React from 'react'
import {
  handleCopyPublicKey,
  handleFetchKey,
  handleSetContentType,
  WebhooksEditControls,
} from '../webhooks-edit-controls'
import { render } from '../../../tests/react-testing'
import { ExpandableContentType } from '../webhooks-manage'
import { mockWebhookModel } from '../../../tests/__stubs__/webhooks'

jest.mock('../state/use-webhooks-state')
jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [{ keys: [{ id: 'MOCK_ID' }] }, false, undefined, jest.fn()]),
  useReapitUpdate: jest.fn(() => [null, false, jest.fn()]),
}))

jest.useFakeTimers()

describe('WebhooksEditControls', () => {
  it('should match a snapshot with controls content', () => {
    expect(
      render(
        <WebhooksEditControls
          webhookModel={mockWebhookModel}
          expandableContentType={ExpandableContentType.Controls}
          setExpandableContentType={jest.fn()}
          setIndexExpandedRow={jest.fn()}
          refreshSubscriptions={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot with ping content', () => {
    expect(
      render(
        <WebhooksEditControls
          webhookModel={mockWebhookModel}
          expandableContentType={ExpandableContentType.Ping}
          setExpandableContentType={jest.fn()}
          setIndexExpandedRow={jest.fn()}
          refreshSubscriptions={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot with manage content', () => {
    expect(
      render(
        <WebhooksEditControls
          webhookModel={mockWebhookModel}
          expandableContentType={ExpandableContentType.Manage}
          setExpandableContentType={jest.fn()}
          setIndexExpandedRow={jest.fn()}
          refreshSubscriptions={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleSetContentType', () => {
  it('should set expandable content size', () => {
    const expandableContentType = ExpandableContentType.Manage
    const setExpandableContentType = jest.fn()
    const curried = handleSetContentType(expandableContentType, setExpandableContentType)
    curried()
    expect(setExpandableContentType).toHaveBeenCalledWith(ExpandableContentType.Manage)
  })
})

describe('handleCopyCode', () => {
  it('should set then reset the copy text', () => {
    const setCopyState = jest.fn()

    const curried = handleCopyPublicKey(setCopyState)

    curried()

    jest.runAllTimers()

    expect(setCopyState).toHaveBeenCalledTimes(2)
    expect(setCopyState).toHaveBeenCalledWith(true)
    expect(setCopyState).toHaveBeenCalledWith(false)
  })
})

describe('handleFetchKey', () => {
  it('should trigger a fetch of the key', () => {
    const setFetchKey = jest.fn()
    const curried = handleFetchKey(setFetchKey)
    curried()
    expect(setFetchKey).toHaveBeenCalledWith(true)
  })
})
