import * as React from 'react'
import { render } from '../../../../tests/react-testing'
import AnalyticsCostExplorer from '../analytics-cost-explorer'
import { MessageProvider } from '../../../../context/message-context'

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

describe('AnalyticsCostExplorer', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <MessageProvider>
          <AnalyticsCostExplorer />
        </MessageProvider>,
      ),
    ).toMatchSnapshot()
  })
})
