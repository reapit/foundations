import * as React from 'react'
import { render } from '../../../tests/react-testing'
import AnalyticsMonthlyUsage from '../analytics-monthly-usage'
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

describe('AnalyticsMonthlyUsage', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <MessageProvider>
          <AnalyticsMonthlyUsage />
        </MessageProvider>,
      ),
    ).toMatchSnapshot()
  })
})
