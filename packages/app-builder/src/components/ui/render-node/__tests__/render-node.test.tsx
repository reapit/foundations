import * as React from 'react'
import { shallow } from 'enzyme'
import { RenderNode } from '../index'
import { MockedProvider } from '@apollo/client/testing'

describe('RenderNode', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <MockedProvider>
        <RenderNode render={<></>} iframeRef={{}} />
      </MockedProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
