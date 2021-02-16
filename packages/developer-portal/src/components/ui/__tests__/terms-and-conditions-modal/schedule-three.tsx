import React from 'react'
import { ScheduleThree } from '../../terms-and-conditions-modal/schedule-three'
import { shallow } from 'enzyme'

describe('Schedule Three', () => {
  it('it matches a snapshot', () => {
    const wrapper = shallow(<ScheduleThree />)
    expect(wrapper).toMatchSnapshot()
  })
})
