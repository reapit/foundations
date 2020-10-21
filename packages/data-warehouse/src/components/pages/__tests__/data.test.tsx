import * as React from 'react'
import { shallow } from 'enzyme'
import Data from '../data'

describe('Data', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Data />)).toMatchSnapshot()
  })
})
