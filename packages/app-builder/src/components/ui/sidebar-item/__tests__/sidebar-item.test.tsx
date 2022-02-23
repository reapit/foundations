import * as React from 'react'
import { shallow } from 'enzyme'
import SidebarItem from '../index'
import { MockedProvider } from '@apollo/client/testing'

describe('SidebarItem', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <MockedProvider>
        <SidebarItem title={''} icon={() => null} />
      </MockedProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
