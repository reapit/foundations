import * as React from 'react'
import { shallow } from 'enzyme'

import Router from '../router'

describe('Router', () => {
  it('should match a snapshot', () => {
    process.env.REAPIT_ENV = 'DEV'
    expect(shallow(<Router />)).toMatchSnapshot()
  })
})
