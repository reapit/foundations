import React from 'react'
import { render } from '../../../tests/react-testing'
import MarketplaceInstallations from '../marketplace-installations'

jest.mock('swr')

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectIsDesktop: false,
    connectSession: {
      loginIdentity: {
        developerId: 'SOME_ID',
        email: 'some@email.com',
      },
    },
  }),
}))

jest.mock('../../../utils/use-org-id')

describe('Marketplace Installations', () => {
  it('Will match snapshot', async () => {
    expect(render(<MarketplaceInstallations />)).toMatchSnapshot()
  })
})
