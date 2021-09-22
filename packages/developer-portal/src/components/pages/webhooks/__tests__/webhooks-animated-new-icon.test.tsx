import React from 'react'
import { render } from '../../../../tests/react-testing'
import { WebhooksAnimatedNewIcon } from '../webhooks-animated-new-icon'

describe('WebhooksAnimatedNewIcon', () => {
  it('should match a snapshot', () => {
    expect(render(<WebhooksAnimatedNewIcon />)).toMatchSnapshot()
  })
})
