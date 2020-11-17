import React from 'react'
import { ScheduleOne } from '../../terms-and-conditions-modal/schedule-one'
import { render } from '@testing-library/react'

describe('Schedule One', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(<ScheduleOne />)
    expect(wrapper).toMatchSnapshot()
  })
})
