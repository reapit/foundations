import * as React from 'react'
import { mount } from 'enzyme'
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
      mount(
        <MessageProvider>
          <AnalyticsMonthlyUsage />
        </MessageProvider>,
      ),
    ).toMatchSnapshot()
  })
})
