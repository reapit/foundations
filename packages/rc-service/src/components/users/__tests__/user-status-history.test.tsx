import React from 'react'
import { UserStatusHistory } from '../user-status-history'
import { render } from '../../../tests/react-testing'

describe('UserStatusHistory', () => {
  it('Match snapshot', () => {
    expect(render(<UserStatusHistory user={{}} />))
  })
})
