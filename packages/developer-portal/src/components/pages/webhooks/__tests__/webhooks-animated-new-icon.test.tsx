import React from 'react'
import { shallow } from 'enzyme'
import { WebhooksAnimatedNewIcon } from '../webhooks-animated-new-icon'

describe('WebhooksAnimatedNewIcon', () => {
  it('should match a snapshot', () => {
    expect(shallow(<WebhooksAnimatedNewIcon />)).toMatchSnapshot()
  })
})
