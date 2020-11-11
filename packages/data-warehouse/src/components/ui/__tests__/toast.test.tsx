import * as React from 'react'
import { mount } from 'enzyme'
import Toast from '../toast'
import { MessageProvider } from '../../../context/message-context'

describe('Toast', () => {
  it('should match a snapshot', () => {
    const wrapper = mount(
      <MessageProvider>
        <Toast />
      </MessageProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
