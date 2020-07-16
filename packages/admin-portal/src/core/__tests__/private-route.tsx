import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { PrivateRoute, handleRedirectToAuthenticationPage, fetchAccessToken } from '../private-route'
import appState from '@/reducers/__stubs__/app-state'
import { LoginIdentity } from '@reapit/cognito-auth'
import Routes from '@/constants/routes'
import { MemoryRouter } from 'react-router'
import { getMockRouterProps } from '@/utils/mock-helper'
import { getAccessToken } from '@/utils/session'

jest.mock('@/utils/session')

describe('PrivateRouter', () => {
  const { history } = getMockRouterProps({})
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
  })

  describe('fetchAccessToken', () => {
    it('should run correctly', async () => {
      fetchAccessToken()
      expect(getAccessToken).toHaveBeenCalledTimes(1)
    })
  })

  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.LOGIN, key: 'appsManagementRoute' }]}>
            <PrivateRoute component={() => null} />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('handleRedirectToAuthenticationPage', () => {
    it('should redirect to 404 page if land on admin page, and is not admin', () => {
      const mockLoginIdentity = {
        clientId: 'testClientId',
      } as LoginIdentity
      const fn = handleRedirectToAuthenticationPage(history, mockLoginIdentity)
      fn()
      expect(history.replace).toBeCalledWith(Routes.FOUR_O_FOUR)
    })
  })
})
