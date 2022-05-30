import React from 'react'
import { render } from '../../../tests/react-testing'
import AccountUpdateModal, { AccountUpdateModalForm } from '../account-update-modal'
import { MessageProvider } from '../../../../context/message-context'

describe('AccountUpdateModal', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <MessageProvider>
          <AccountUpdateModal visible={true} accountId="SOME_ID" handleClose={jest.fn()} />
        </MessageProvider>,
      ),
    ).toMatchSnapshot()
  })
})

describe('AccountUpdateModalForm', () => {
  it('should match a snapshot', () => {
    expect(render(<AccountUpdateModalForm handleClose={jest.fn()} />)).toMatchSnapshot()
  })
})
