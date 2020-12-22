import * as React from 'react'
import { mount } from 'enzyme'
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
      mount(
        <MessageProvider>
          <AnalyticsDailyUsage />
        </MessageProvider>,
      ),
    ).toMatchSnapshot()
  })
})
