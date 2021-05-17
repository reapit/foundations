import React from 'react'
import { shallow } from 'enzyme'
import { appointment } from '@/graphql/__mocks__/appointment'
import { AppointmentList } from '../appointment-list'

describe('AppointmentList', () => {
  it('should match snapshot with appointments', () => {
    const mockProps = {
      appointments: [appointment],
    }
    const wrapper = shallow(<AppointmentList {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot with no appointments', () => {
    const mockProps = {
      appointments: [],
    }
    const wrapper = shallow(<AppointmentList {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
