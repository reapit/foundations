import React from 'react'
import { render } from '../../../../tests/react-testing'
import { WebhooksAbout } from '../webhooks-about'

describe('WebhooksAbout', () => {
  it('should match a snapshot', () => {
    expect(render(<WebhooksAbout />)).toMatchSnapshot()
  })
})
