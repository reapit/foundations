import React from 'react'
import { useGlobalState } from '../../../core/use-global-state'
import { render } from '../../../tests/react-testing'
import { Accounts } from '../accounts'

jest.mock('../../../core/use-global-state')

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

const mockUseGlobalState = useGlobalState as jest.Mock

describe('Accounts', () => {
  it('should match a snapshot with accounts', () => {
    expect(render(<Accounts />)).toMatchSnapshot()
  })

  it('should match a snapshot with no accounts', () => {
    mockUseGlobalState.mockReturnValueOnce({
      accounts: null,
    })
    expect(render(<Accounts />)).toMatchSnapshot()
  })
})
