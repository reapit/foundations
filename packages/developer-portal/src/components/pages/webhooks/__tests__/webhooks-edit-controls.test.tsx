import React from 'react'
import { handleSetContentType, WebhooksEditControls } from '../webhooks-edit-controls'
import { webhookItemDataStub } from '../../../../sagas/__stubs__/webhook-edit'
import { render } from '../../../../tests/react-testing'
import { ExpandableContentType } from '../webhooks-manage'

describe('WebhooksEditControls', () => {
  it('should match a snapshot with controls content', () => {
    expect(
      render(
        <WebhooksEditControls
          webhookModel={webhookItemDataStub}
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
          webhookModel={webhookItemDataStub}
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
          webhookModel={webhookItemDataStub}
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
