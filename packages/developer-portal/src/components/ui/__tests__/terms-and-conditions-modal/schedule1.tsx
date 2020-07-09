import React from 'react'
import { Schedule1 } from '../../terms-and-conditions-modal/schedule1'
import { render } from '@testing-library/react'

describe('Schedule1', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(<Schedule1 />)
    expect(wrapper).toMatchSnapshot()
  })
})
