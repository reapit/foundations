import * as React from 'react'
import { shallow } from 'enzyme'
import Health from '../health'

describe('Health', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Health />)).toMatchSnapshot()
  })
})
