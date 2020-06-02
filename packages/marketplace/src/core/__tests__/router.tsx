import * as React from 'react'
import { shallow } from 'enzyme'

import Router from '../router'

describe('Router', () => {
  it('should match a snapshot', () => {
    window.reapit.config.appEnv === 'development'
    expect(shallow(<Router />)).toMatchSnapshot()
  })
})
