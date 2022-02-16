import { render } from '@testing-library/react'
import React from 'react'
import AppsNewPage from '../index'

describe('AppTypeOptionsContent', () => {
  it('should match a snapshot', () => {
    expect(render(<AppsNewPage />)).toMatchSnapshot()
  })
})
