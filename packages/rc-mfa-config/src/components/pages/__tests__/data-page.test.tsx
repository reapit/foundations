import React from 'react'
import { render } from '@testing-library/react'
import DataPage from '../data-page'

describe('DataPage', () => {
  it('should match a snapshot', () => {
    expect(render(<DataPage />)).toMatchSnapshot()
  })
})
