import React from 'react'
import { shallow } from 'enzyme'
import { WebhooksAbout } from '../webhooks-about'

describe('WebhooksAbout', () => {
  it('should match a snapshot', () => {
    expect(shallow(<WebhooksAbout />)).toMatchSnapshot()
  })
})
