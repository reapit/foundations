import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { Help } from '../help'

jest.mock('@/core/router', () => ({
  history: {
    push: jest.fn(),
  },
}))

describe('ClientHelpPage', () => {
  it('should match a snapshot', () => {
    expect(render(<Help />)).toMatchSnapshot()
  })
})
