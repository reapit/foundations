import React from 'react'
import { PrivateRoute, handleRedirectRegistraitionPage } from '../private-route'
import Routes from '../../constants/routes'
import { getMockRouterProps } from '@/utils/mock-helper'
import { ReapitConnectSession } from '@reapit/connect-session'
import { COGNITO_GROUP_USERS } from '../../selector/auth'
import { render } from '../../tests/react-testing'

const { history } = getMockRouterProps({})

jest.mock('../use-global-state')

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    expect(render(<PrivateRoute component={() => null} />)).toMatchSnapshot()
  })
})

describe('handleRedirectToAuthenticationPage', () => {
  it('should redirect to authentication page for CLIENT', () => {
    const mockConnectSession = {
      loginIdentity: {
        developerId: '',
      },
    } as ReapitConnectSession
    const curried = handleRedirectRegistraitionPage(history, mockConnectSession)
    curried()
    expect(history.push).toBeCalledWith(`${Routes.SELECT_ROLE}`)
  })

  it('should redirect to authentication page for DEVELOPER', () => {
    const mockConnectSession = {
      loginIdentity: {
        developerId: '',
        agencyCloudId: 'RES',
        groups: [COGNITO_GROUP_USERS],
      },
    } as ReapitConnectSession
    const curried = handleRedirectRegistraitionPage(history, mockConnectSession)
    curried()
    expect(history.push).toBeCalledWith(`${Routes.CUSTOMER_REGISTER}`)
  })
})
