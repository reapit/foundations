import * as React from 'react'
import { mount } from 'enzyme'
import Data from '../data'
import { MessageProvider } from '../../../../context/message-context'

describe('Data', () => {
  it('should match a snapshot', () => {
    expect(
      mount(
        <MessageProvider>
          <Data />
        </MessageProvider>,
      ),
    ).toMatchSnapshot()
  })
})
