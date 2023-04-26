import React from 'react'
import { render } from '../../tests/react-testing'
import { RoutesComponent } from '../router'

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {
      loginIdentity: {},
    },
    connectInternalRedirect: '',
  }),
}))

describe('RoutesComponent', () => {
  it('should match a snapshot', () => {
    expect(render(<RoutesComponent />)).toMatchSnapshot()
  })
})
