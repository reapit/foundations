import React from 'react'
import { render } from '../../../../tests/react-testing'
import { ScheduleTwo } from '../schedule-two'

describe('Schedule Two', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(<ScheduleTwo />)
    expect(wrapper).toMatchSnapshot()
  })
})
