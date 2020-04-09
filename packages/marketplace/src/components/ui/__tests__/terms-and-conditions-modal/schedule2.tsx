import React from 'react'
import { Schedule2 } from '../../terms-and-conditions-modal/schedule2'
import { render } from '@testing-library/react'

describe('Schedule1', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(<Schedule2 />)
    expect(wrapper).toMatchSnapshot()
  })
})
