import * as React from 'react'
import { mount } from 'enzyme'
import Subscriptions from '../subscriptions'
import { MessageProvider } from '../../../../context/message-context'

describe('Subscriptions', () => {
  it('should match a snapshot', () => {
    expect(
      mount(
        <MessageProvider>
          <Subscriptions />
        </MessageProvider>,
      ),
    ).toMatchSnapshot()
  })
})
