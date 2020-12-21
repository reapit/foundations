import * as React from 'react'
import { mount } from 'enzyme'
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
      mount(
        <MessageProvider>
          <Data />
        </MessageProvider>,
      ),
    ).toMatchSnapshot()
  })
})
