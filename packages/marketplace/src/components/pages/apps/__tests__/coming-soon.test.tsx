import * as React from 'react'
import { shallow } from 'enzyme'

import ComingSoonApps from '../coming-soon'

describe('ComingSoonApps', () => {
  it('should match a snapshot', () => {
    expect(shallow(<ComingSoonApps />)).toMatchSnapshot()
  })
})
