import React from 'react'
import { render } from '../../../tests/react-testing'
import AppsBrowsePage from '..'

describe('AppsBrowsePage', () => {
  it('should match a snapshot', () => {
    expect(render(<AppsBrowsePage />)).toMatchSnapshot()
  })
})
