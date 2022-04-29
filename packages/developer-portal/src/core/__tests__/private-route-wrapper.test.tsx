import React from 'react'
import { PrivateRouteWrapper } from '../private-route-wrapper'
import { render } from '../../tests/react-testing'

window.reapit.config.pipelineWhitelist = []
window.reapit.config.liveChatWhitelist = []

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {
      loginIdentity: {
        developerId: 'MOCK_DEVELOPER_ID',
      },
    },
    connectInternalRedirect: '',
  }),
}))

describe('PrivateRouteWrapper', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const wrapper = render(<PrivateRouteWrapper path="/" />)
    expect(wrapper).toMatchSnapshot()
  })
})
