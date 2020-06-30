import * as React from 'react'
import { shallow } from 'enzyme'
import Appointment from '../appointment'

describe('Appointment', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Appointment />)
    expect(wrapper).toMatchSnapshot()
  })
})
