import * as React from 'react'
import { mount } from 'enzyme'
import Accounts from '../accounts'
import { MessageProvider } from '../../../../context/message-context'

describe('Accounts', () => {
  it('should match a snapshot', () => {
    expect(
      mount(
        <MessageProvider>
          <Accounts />
        </MessageProvider>,
      ),
    ).toMatchSnapshot()
  })
})
