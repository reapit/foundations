import * as React from 'react'
import { render } from '../../tests/react-testing'
import { MessageProvider } from '../message-context'

describe('Toast', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <MessageProvider>
        <div>Child Component</div>
      </MessageProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
