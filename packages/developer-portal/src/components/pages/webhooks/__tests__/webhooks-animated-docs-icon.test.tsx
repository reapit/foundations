import React from 'react'
import { shallow } from 'enzyme'
import { WebhooksAnimatedDocsIcon } from '../webhooks-animated-docs-icon'

describe('WebhooksAnimatedDocsIcon', () => {
  it('should match a snapshot', () => {
    expect(shallow(<WebhooksAnimatedDocsIcon />)).toMatchSnapshot()
  })
})
