import React from 'react'
import { render } from '../../../../tests/react-testing'
import { ScheduleOne } from '../schedule-one'

describe('Schedule One', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(<ScheduleOne />)
    expect(wrapper).toMatchSnapshot()
  })
})
