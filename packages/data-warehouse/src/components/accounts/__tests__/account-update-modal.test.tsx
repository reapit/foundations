import React from 'react'
import { render } from '../../../tests/react-testing'
import { AccountUpdateModal } from '../account-update-modal'

describe('AccountUpdateModal', () => {
  it('should match a snapshot', () => {
    expect(render(<AccountUpdateModal accountId="SOME_ID" closeModal={jest.fn()} />)).toMatchSnapshot()
  })
})
