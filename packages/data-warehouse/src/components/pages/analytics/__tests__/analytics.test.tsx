import * as React from 'react'
import { mount } from 'enzyme'
import Analytics from '../analytics'
import { MessageProvider } from '../../../../context/message-context'

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: null,
  }),
}))

describe('Analytics', () => {
  it('should match a snapshot', () => {
    expect(
      mount(
        <MessageProvider>
          <Analytics />
        </MessageProvider>,
      ),
    ).toMatchSnapshot()
  })
})
