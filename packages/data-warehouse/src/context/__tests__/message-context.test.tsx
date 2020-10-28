import * as React from 'react'
import { shallow } from 'enzyme'
import { MessageProvider } from '../message-context'

describe('Toast', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <MessageProvider>
        <div>Child Component</div>
      </MessageProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
