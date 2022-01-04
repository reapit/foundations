import React from 'react'
import { render } from '../../../../tests/react-testing'
import { WebhooksAnimatedDocsIcon } from '../webhooks-animated-docs-icon'

describe('WebhooksAnimatedDocsIcon', () => {
  it('should match a snapshot where animated', () => {
    expect(render(<WebhooksAnimatedDocsIcon isAnimated />)).toMatchSnapshot()
  })

  it('should match a snapshot where not animated', () => {
    expect(render(<WebhooksAnimatedDocsIcon isAnimated={false} />)).toMatchSnapshot()
  })
})
