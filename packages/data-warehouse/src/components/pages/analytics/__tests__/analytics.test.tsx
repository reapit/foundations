import * as React from 'react'
import { render } from '../../../tests/react-testing'
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
      render(
        <MessageProvider>
          <Analytics />
        </MessageProvider>,
      ),
    ).toMatchSnapshot()
  })
})
