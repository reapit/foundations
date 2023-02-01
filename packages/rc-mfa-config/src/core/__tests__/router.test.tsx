import React from 'react'
import { render } from '../../tests/react-testing'
import Router from '../router'

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {
      loginIdentity: {},
    },
    connectInternalRedirect: '',
  }),
}))

describe('Router', () => {
  it('should match a snapshot', () => {
    expect(render(<Router />)).toMatchSnapshot()
  })
})
