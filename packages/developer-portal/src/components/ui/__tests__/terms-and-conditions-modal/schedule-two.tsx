import React from 'react'
import { ScheduleTwo } from '../../terms-and-conditions-modal/schedule-two'
import { render } from '@testing-library/react'

describe('Schedule Two', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(<ScheduleTwo />)
    expect(wrapper).toMatchSnapshot()
  })
})
