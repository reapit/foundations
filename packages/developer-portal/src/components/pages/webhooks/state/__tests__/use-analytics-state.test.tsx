import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { WebhooksProvider } from '../use-webhooks-state'

describe('WebhooksProvider', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <WebhooksProvider>
          <div />
        </WebhooksProvider>,
      ),
    ).toMatchSnapshot()
  })
})
