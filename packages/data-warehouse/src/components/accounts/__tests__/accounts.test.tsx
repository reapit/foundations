import React from 'react'
import { render } from '../../../tests/react-testing'
import { Accounts } from '../accounts'

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {
      loginIdentity: {
        developerId: 'SOME_ID',
      },
    },
  }),
}))

describe('Accounts', () => {
  it('should match a snapshot', () => {
    expect(render(<Accounts />)).toMatchSnapshot()
  })
})
