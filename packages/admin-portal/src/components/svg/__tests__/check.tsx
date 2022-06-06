import React from 'react'
import { render } from '../../../tests/react-testing'
import Check from '../check'

describe('Check', () => {
  it('should match snapshot', () => {
    const wrapper = render(<Check />)
    expect(wrapper).toMatchSnapshot()
  })
})
