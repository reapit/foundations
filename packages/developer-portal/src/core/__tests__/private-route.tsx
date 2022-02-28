import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { PrivateRoute, handleRedirectRegistraitionPage } from '../private-route'
import appState from '@/reducers/__stubs__/app-state'
import Routes from '@/constants/routes'
import { MemoryRouter } from 'react-router'
import { getMockRouterProps } from '@/utils/mock-helper'
import { ReapitConnectSession } from '@reapit/connect-session'
import { COGNITO_GROUP_USERS } from '../../selector/auth'

jest.mock('@/utils/session')

describe('PrivateRouter', () => {
  const { history } = getMockRouterProps({})
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
  })

  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.APPS, key: 'developerAppsRoute' }]}>
            <PrivateRoute component={() => null} />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
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
})
