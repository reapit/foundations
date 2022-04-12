import React from 'react'
import { handleSetContentType, WebhooksEditControls } from '../webhooks-edit-controls'
import { render } from '../../../tests/react-testing'
import { ExpandableContentType } from '../webhooks-manage'
import { mockWebhookModel } from '../../../tests/__stubs__/webhooks'

jest.mock('../state/use-webhooks-state')

describe('WebhooksEditControls', () => {
  it('should match a snapshot with controls content', () => {
    expect(
      render(
        <WebhooksEditControls
          webhookModel={mockWebhookModel}
          expandableContentType={ExpandableContentType.Controls}
          setExpandableContentType={jest.fn()}
          setIndexExpandedRow={jest.fn()}
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
