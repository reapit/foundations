import * as React from 'react'
import { render } from '../../../tests/react-testing'
import AnalyticsDailyUsage from '../analytics-daily-usage'
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

describe('AnalyticsDailyUsage', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <MessageProvider>
          <AnalyticsDailyUsage />
        </MessageProvider>,
      ),
    ).toMatchSnapshot()
  })
})
