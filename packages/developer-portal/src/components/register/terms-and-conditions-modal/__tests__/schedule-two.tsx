import React from 'react'
import { ScheduleTwo } from '../schedule-two'
import { shallow } from 'enzyme'

describe('Schedule Two', () => {
  it('it matches a snapshot', () => {
    const wrapper = shallow(<ScheduleTwo />)
    expect(wrapper).toMatchSnapshot()
  })
})
