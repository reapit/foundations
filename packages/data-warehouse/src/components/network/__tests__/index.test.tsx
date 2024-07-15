import React from 'react'
import NetworkPage from '../index'
import { render } from '../../../tests/react-testing'

describe('NetworkPage', () => {
  it('renders and matches a snapshot', () => {
    const wrappper = render(<NetworkPage />)
    expect(wrappper).toMatchSnapshot()
  })
})
