import * as React from 'react'
import { render } from '../../../tests/react-testing'
import Health from '../health'

describe('Health', () => {
  it('should match a snapshot', () => {
    expect(render(<Health />)).toMatchSnapshot()
  })
})
