import * as React from 'react'

import DeveloperWebHooks from '../developer-webhooks'
import { shallow } from 'enzyme'

describe('DeveloperWebHooks', () => {
  it('should match a snapshot', () => {
    expect(shallow(<DeveloperWebHooks />)).toMatchSnapshot()
  })
})
