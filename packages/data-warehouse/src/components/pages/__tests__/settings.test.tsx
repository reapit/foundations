import * as React from 'react'
import { shallow } from 'enzyme'
import Settings from '../settings'

describe('Settings', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Settings />)).toMatchSnapshot()
  })
})
