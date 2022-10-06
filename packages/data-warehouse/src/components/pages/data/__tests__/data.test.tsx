import React from 'react'
import { render } from '../../../../tests/react-testing'
import Data from '../data'
import { MessageProvider } from '../../../../context/message-context'

// jest.mock('../../../../services/shares')
// jest.mock('../../../../services/data-sets')
// jest.mock('../../../../services/subscriptions')

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

describe('Data', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <MessageProvider>
          <Data />
        </MessageProvider>,
      ),
    ).toMatchSnapshot()
  })
})
