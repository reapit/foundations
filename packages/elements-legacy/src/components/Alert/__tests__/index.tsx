import * as React from 'react'
import { render } from '@testing-library/react'
import { Alert } from '..'

describe('Alert', () => {
  it('should match a snapshot', () => {
    expect(render(<Alert message="Some random message" />)).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
