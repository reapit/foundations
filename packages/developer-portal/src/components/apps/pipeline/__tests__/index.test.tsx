import React from 'react'
import AppPipeline from '..'
import { render } from '../../../../tests/react-testing'

jest.mock('@harelpls/use-pusher', () => ({
  PusherProvider: ({ children }) => {
    return <>{children}</>
  },
}))

jest.mock('../../state/use-app-state')

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      idToken: 'MOCK_TOKEN',
    },
  })),
}))

describe('AppPipeline', () => {
  it('Should match snapshot where connect session is present', () => {
    expect(render(<AppPipeline />)).toMatchSnapshot()
  })
})
