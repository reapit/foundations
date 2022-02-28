import * as React from 'react'
import { render, screen } from '@testing-library/react'
import SidebarItem from '../index'
import { MockedProvider } from '@apollo/client/testing'

describe('SidebarItem', () => {
  it('should match a snapshot', () => {
    render(
      <MockedProvider>
        <SidebarItem title={''} icon={() => null} />
      </MockedProvider>,
    )
    expect(screen).toMatchSnapshot()
  })
})
