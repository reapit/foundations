import React from 'react'
import { render } from '../../../tests/react-testing'
import { UpdateUserActive } from '../update-user-active'

describe('UpdateUserActive', () => {
  it('Match snapshot', () => {
    expect(render(<UpdateUserActive user={{}} />))
  })
})
