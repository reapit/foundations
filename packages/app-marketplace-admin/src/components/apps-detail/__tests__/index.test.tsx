import React from 'react'
import { render } from '../../../tests/react-testing'
import AppsDetailPage from '..'

describe('AppsDetailPage', () => {
  it('should match a snapshot', () => {
    expect(render(<AppsDetailPage />)).toMatchSnapshot()
  })
})
