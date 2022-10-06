import React from 'react'
import { render } from '../../../tests/react-testing'
import Toast from '../toast'
import { MessageProvider } from '../../../context/message-context'

describe('Toast', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <MessageProvider>
        <Toast />
      </MessageProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
