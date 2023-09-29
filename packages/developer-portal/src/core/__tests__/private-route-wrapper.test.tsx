import React from 'react'
import { PrivateRouteWrapper, handleRedirectRegistraitionPage } from '../private-route-wrapper'
import { render } from '../../tests/react-testing'
import { ReapitConnectSession } from '@reapit/connect-session'
import { COGNITO_GROUP_USERS } from '../../utils/auth'
import Routes from '../../constants/routes'

process.env.pipelineWhitelist = []
process.env.liveChatWhitelist = []

jest.mock('uuid', () => ({
  validate: jest.fn(() => true),
}))

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
    window.location.pathname = Routes.APPS
    const wrapper = render(
      <PrivateRouteWrapper>
        <div />
      </PrivateRouteWrapper>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleRedirectToAuthenticationPage', () => {
  it('should redirect to authentication page for CLIENT', () => {
    const mockConnectSession = {
      loginIdentity: {
        developerId: '',
      },
    } as ReapitConnectSession
    const navigate = jest.fn()
    const curried = handleRedirectRegistraitionPage(navigate, mockConnectSession)
    curried()
    expect(navigate).toBeCalledWith(`${Routes.SELECT_ROLE}`)
  })

  it('should redirect to authentication page for DEVELOPER', () => {
    const mockConnectSession = {
      loginIdentity: {
        developerId: '',
        agencyCloudId: 'RES',
        groups: [COGNITO_GROUP_USERS],
      },
    } as ReapitConnectSession
    const navigate = jest.fn()
    const curried = handleRedirectRegistraitionPage(navigate, mockConnectSession)
    curried()
    expect(navigate).toBeCalledWith(`${Routes.CUSTOMER_REGISTER}`)
  })
})
