import React from 'react'
import { render } from '../../tests/react-testing'
import Router from '../router'

jest.mock('../analytics')
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

describe('Router', () => {
  window.location.pathname = '/'
  it('should match a snapshot', () => {
    expect(render(<Router />)).toMatchSnapshot()
  })
})
