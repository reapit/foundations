import React from 'react'
import { render } from '../../../tests/react-testing'
import { OkayPage } from '../ok-page'

describe('OkayPage', () => {
  it('should match a snapshot', () => {
    expect(render(<OkayPage />)).toMatchSnapshot()
  })
})
