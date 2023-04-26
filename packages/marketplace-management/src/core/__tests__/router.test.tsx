import React from 'react'
import { render } from '../../tests/react-testing'
import { RoutesComponent } from '../router'

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {
      loginIdentity: {},
      groups: [],
    },
    connectInternalRedirect: '',
  }),
}))

describe('RoutesComponent', () => {
  window.location.pathname = '/'
  it('should match a snapshot', () => {
    expect(render(<RoutesComponent />)).toMatchSnapshot()
  })
})
