import React from 'react'
import { render } from '@testing-library/react'
import { OkayPage } from '../ok-page'

describe('OkayPage', () => {
  it('should match a snapshot', () => {
    expect(render(<OkayPage />)).toMatchSnapshot()
  })
})
