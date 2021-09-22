import React from 'react'
import { render } from '../../../../tests/react-testing'
import { WebhooksAnimatedDocsIcon } from '../webhooks-animated-docs-icon'

describe('WebhooksAnimatedDocsIcon', () => {
  it('should match a snapshot', () => {
    expect(render(<WebhooksAnimatedDocsIcon />)).toMatchSnapshot()
  })
})
