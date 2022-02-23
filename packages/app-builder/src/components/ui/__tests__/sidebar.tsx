import * as React from 'react'
import { shallow } from 'enzyme'
import Sidebar from '../sidebar'
import { MockedProvider } from '@apollo/client/testing'

describe('Sidebar', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <MockedProvider>
        <Sidebar />
      </MockedProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
