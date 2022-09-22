import React from 'react'
import { render } from '../../../tests/react-testing'
import { IaaS } from '../index'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [
    {
      items: [],
      meta: {},
    },
    false,
    undefined,
    () => {},
  ]),
  useReapitUpdate: jest.fn(() => []),
  UpdateReturnTypeEnum: {
    RESPONSE: 'RESPONSE',
  },
  objectToQuery: jest.fn(),
}))

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {
      idToken: 'MOCK_TOKEN',
      loginIdentity: {
        developerId: 'MOCK_DEVELOPER_ID',
      },
    },
    connectInternalRedirect: '',
  }),
}))

describe('IaaS', () => {
  it('should match snapshot', () => {
    expect(render(<IaaS />)).toMatchSnapshot()
  })
})
