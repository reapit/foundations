import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { Controls } from '../controls'

jest.mock('../../state/use-settings-state')

describe('Controls', () => {
  it('should match a snapshot', () => {
    expect(render(<Controls />)).toMatchSnapshot()
  })
})
