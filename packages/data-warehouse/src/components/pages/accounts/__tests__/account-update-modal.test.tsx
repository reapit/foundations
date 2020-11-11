import React from 'react'
import { shallow } from 'enzyme'
import AccountUpdateModal, { AccountUpdateModalForm } from '../account-update-modal'
import { MessageProvider } from '../../../../context/message-context'

describe('AccountUpdateModal', () => {
  it('should match a snapshot', () => {
    expect(
      shallow(
        <MessageProvider>
          <AccountUpdateModal visible={true} accountId="SOME_ID" handleClose={jest.fn()} />
        </MessageProvider>,
      ),
    ).toMatchSnapshot()
  })
})

describe('AccountUpdateModalForm', () => {
  it('should match a snapshot', () => {
    expect(shallow(<AccountUpdateModalForm handleClose={jest.fn()} />)).toMatchSnapshot()
  })
})
