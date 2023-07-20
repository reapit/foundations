import React from 'react'
import { render } from '../../../../tests/react-testing'
import { AppCard } from '../app-card'
import { mockAppDetailModel } from '../../../../tests/__stubs__/apps'
import { useReapitConnect } from '@reapit/connect-session'

jest.mock('../../state/use-app-state')
jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      loginIdentity: {
        groups: [],
      },
    },
  })),
}))

const mockUseReapitConnect = useReapitConnect as jest.Mock

describe('AppCard', () => {
  it('should match a snapshot for a regular user', () => {
    expect(render(<AppCard app={mockAppDetailModel} />)).toMatchSnapshot()
  })

  it('should match a snapshot for an admin', () => {
    mockUseReapitConnect.mockReturnValueOnce({
      connectSession: {
        loginIdentity: {
          groups: ['FoundationsDeveloperAdmin'],
        },
      },
    })
    expect(render(<AppCard app={mockAppDetailModel} />)).toMatchSnapshot()
  })

  it('should match a snapshot for an admin with delete protection', () => {
    mockUseReapitConnect.mockReturnValueOnce({
      connectSession: {
        loginIdentity: {
          groups: ['FoundationsDeveloperAdmin'],
        },
      },
    })
    expect(render(<AppCard app={{ ...mockAppDetailModel, deletionProtection: true }} />)).toMatchSnapshot()
  })
})
