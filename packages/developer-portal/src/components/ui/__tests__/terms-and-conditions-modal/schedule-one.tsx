import React from 'react'
import { ScheduleOne } from '../../terms-and-conditions-modal/schedule-one'
import { shallow } from 'enzyme'

describe('Schedule One', () => {
  it('it matches a snapshot', () => {
    const wrapper = shallow(<ScheduleOne />)
    expect(wrapper).toMatchSnapshot()
  })
})
