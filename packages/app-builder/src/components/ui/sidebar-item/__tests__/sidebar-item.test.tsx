import * as React from 'react'
import { render } from '@testing-library/react'
import SidebarItem from '../index'
import { MockedProvider } from '@apollo/client/testing'

describe('SidebarItem', () => {
  it('should match a snapshot', () => {
    const { asFragment } = render(
      <MockedProvider>
        <SidebarItem title={''} />
      </MockedProvider>,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
