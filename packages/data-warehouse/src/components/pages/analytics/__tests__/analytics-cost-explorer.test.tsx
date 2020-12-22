import * as React from 'react'
import { mount } from 'enzyme'
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
      mount(
        <MessageProvider>
          <AnalyticsCostExplorer />
        </MessageProvider>,
      ),
    ).toMatchSnapshot()
  })
})
