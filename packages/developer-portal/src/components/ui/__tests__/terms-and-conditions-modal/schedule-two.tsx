import React from 'react'
import { ScheduleTwo } from '../../terms-and-conditions-modal/schedule-two'
import { shallow } from 'enzyme'

describe('Schedule Two', () => {
  it('it matches a snapshot', () => {
    const wrapper = shallow(<ScheduleTwo />)
    expect(wrapper).toMatchSnapshot()
  })
})
