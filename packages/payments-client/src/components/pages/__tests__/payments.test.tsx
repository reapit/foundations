import * as React from 'react'
import { shallow } from 'enzyme'
import Payments from '../payments'

describe('Payments', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Payments />)).toMatchSnapshot()
  })
})
