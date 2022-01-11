import React from 'react'
import { render } from '@testing-library/react'
import { Nav } from '../nav'
import { MediaStateProvider, NavStateProvider } from '@reapit/elements'

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {
      loginIdentity: {},
    },
    connectInternalRedirect: '',
  }),
}))

describe('Nav', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <NavStateProvider>
        <MediaStateProvider>
          <Nav />
        </MediaStateProvider>
      </NavStateProvider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
