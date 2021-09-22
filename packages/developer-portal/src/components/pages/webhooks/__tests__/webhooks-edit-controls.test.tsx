import React from 'react'
import { handleSetContentType, WebhooksEditControls } from '../webhooks-edit-controls'
import { webhookItemDataStub } from '../../../../sagas/__stubs__/webhook-edit'
import { render } from '../../../../tests/react-testing'

describe('WebhooksEditControls', () => {
  it('should match a snapshot with small content', () => {
    expect(
      render(
        <WebhooksEditControls
          webhookModel={webhookItemDataStub}
          expandableContentSize="small"
          setExpandableContentSize={jest.fn()}
          setIndexExpandedRow={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot with medium content', () => {
    expect(
      render(
        <WebhooksEditControls
          webhookModel={webhookItemDataStub}
          expandableContentSize="medium"
          setExpandableContentSize={jest.fn()}
          setIndexExpandedRow={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot with large content', () => {
    expect(
      render(
        <WebhooksEditControls
          webhookModel={webhookItemDataStub}
          expandableContentSize="large"
          setExpandableContentSize={jest.fn()}
          setIndexExpandedRow={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleSetContentType', () => {
  it('should set expandable content size', () => {
    const expandableContentSize = 'large'
    const setExpandableContentSize = jest.fn()
    const curried = handleSetContentType(expandableContentSize, setExpandableContentSize)
    curried()
    expect(setExpandableContentSize).toHaveBeenCalledWith('large')
  })
})
