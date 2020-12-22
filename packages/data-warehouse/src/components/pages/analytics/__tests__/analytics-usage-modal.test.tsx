import * as React from 'react'
import { mount } from 'enzyme'
import AnalyticsUsageModal from '../analytics-usage-modal'
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

describe('AnalyticsUsageModal', () => {
  it('should match a snapshot', () => {
    expect(
      mount(
        <MessageProvider>
          <AnalyticsUsageModal visible handleClose={jest.fn()} />
        </MessageProvider>,
      ),
    ).toMatchSnapshot()
  })
})
