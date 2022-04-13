import React from 'react'
import ElementsPage from '..'
import { render } from '../../../tests/react-testing'

describe('ElementsPage', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<ElementsPage />)
    expect(wrapper).toMatchSnapshot()
  })
})
