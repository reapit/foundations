import React from 'react'
import { render } from '../../../tests/react-testing'
import AppsBrowsePage from '..'

jest.mock('../../../core/analytics')

describe('AppsBrowsePage', () => {
  it('should match a snapshot', () => {
    expect(render(<AppsBrowsePage />)).toMatchSnapshot()
  })
})
