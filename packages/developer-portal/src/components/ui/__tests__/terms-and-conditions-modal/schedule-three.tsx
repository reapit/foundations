import React from 'react'
import { ScheduleThree } from '../../terms-and-conditions-modal/schedule-three'
import { render } from '@testing-library/react'

describe('Schedule Three', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(<ScheduleThree />)
    expect(wrapper).toMatchSnapshot()
  })
})
