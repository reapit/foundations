import * as React from 'react'
import { shallow } from 'enzyme'
import SubscriptionsContent from '../subscriptions-content'
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

describe('SubscriptionsContent', () => {
  it('should match a snapshot', () => {
    expect(
      shallow(
        <MessageProvider>
          <SubscriptionsContent />
        </MessageProvider>,
      ),
    ).toMatchSnapshot()
  })
})
