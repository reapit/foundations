import React from 'react'
import { render } from '../../../../tests/react-testing'
import { ScheduleThree } from '../schedule-three'

describe('Schedule Three', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(<ScheduleThree />)
    expect(wrapper).toMatchSnapshot()
  })
})
