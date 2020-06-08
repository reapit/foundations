import * as React from 'react'
import { shallow } from 'enzyme'
import UnsupportBrower from '../unsupport-brower'

describe('UnsupportBrower', () => {
  it('should match a snapshot', () => {
    expect(shallow(<UnsupportBrower />)).toMatchSnapshot()
  })
})
