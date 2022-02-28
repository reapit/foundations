import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { Helper } from '../helper'

jest.mock('../../state/use-app-state')

describe('Helper', () => {
  it('should match a snapshot', () => {
    expect(render(<Helper />)).toMatchSnapshot()
  })
})
