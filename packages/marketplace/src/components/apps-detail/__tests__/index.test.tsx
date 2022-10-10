import React from 'react'
import { render } from '../../../tests/react-testing'
import AppsDetailPage from '..'

jest.mock('../../../core/analytics')

describe('AppsDetailPage', () => {
  it('should match a snapshot', () => {
    expect(render(<AppsDetailPage />)).toMatchSnapshot()
  })
})
