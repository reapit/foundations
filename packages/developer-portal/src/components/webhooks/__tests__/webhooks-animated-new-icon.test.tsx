import React from 'react'
import { render } from '../../../tests/react-testing'
import { WebhooksAnimatedNewIcon } from '../webhooks-animated-new-icon'

describe('WebhooksAnimatedNewIcon', () => {
  it('should match a snapshot where animated', () => {
    expect(render(<WebhooksAnimatedNewIcon isAnimated />)).toMatchSnapshot()
  })

  it('should match a snapshot where not animated', () => {
    expect(render(<WebhooksAnimatedNewIcon isAnimated={false} />)).toMatchSnapshot()
  })
})
