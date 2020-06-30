jest.mock('@/utils/cookie')

import * as React from 'react'
import { setCookieString, COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE, COOKIE_MAX_AGE_INFINITY } from '@/utils/cookie'
import MockDate from 'mockdate'
import { shallow, mount } from 'enzyme'
import { ClientWelcomeMessage, ClientWelcomeMessageProps, handleUserAccept, Support, Welcome } from '../client-welcome'
import routes from '@/constants/routes'
import { HelpGuide } from '@reapit/elements'
import { ReduxState } from '@/types/core'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import appState from '@/reducers/__stubs__/app-state'

const mockProps: ClientWelcomeMessageProps = {
  userAcceptTermAndCondition: jest.fn(),
}

const mockState = {
  ...appState,
  auth: {
    loginSession: {
      loginIdentity: {
        isAdmin: true,
        groups: [] as string[],
      },
    },
  },
} as ReduxState

describe('ClientWelcomeMessage', () => {
  let store
  it('should match a snapshot', () => {
    const mockStore = configureStore()
    store = mockStore(mockState)

    expect(
      mount(
        <Provider store={store}>
          <ClientWelcomeMessage {...mockProps} />
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('Documentation step should match a snapshot', () => {
    expect(
      shallow(
        <HelpGuide>
          <HelpGuide.Step id="step" component={Welcome} heading="Test" subHeading="Test" />
        </HelpGuide>,
      ),
    ).toMatchSnapshot()
  })

  it('Support step should match a snapshot', () => {
    expect(
      shallow(
        <HelpGuide>
          <HelpGuide.Step id="step" component={Support} heading="Test" subHeading="Test" />
        </HelpGuide>,
      ),
    ).toMatchSnapshot()
  })

  it('Welcome step should match a snapshot', () => {
    expect(
      shallow(
        <HelpGuide>
          <HelpGuide.Step id="step" component={Welcome} heading="Test" subHeading="Test" />
        </HelpGuide>,
      ),
    ).toMatchSnapshot()
  })

  describe('handleUserAccept', () => {
    it('should set COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE cookie', () => {
      const TIME_OFFSET = 0
      MockDate.set('2019-12-18T16:30:00', TIME_OFFSET)

      const mockHistory = {
        push: jest.fn(),
      }
      const fn = handleUserAccept(mockHistory)
      fn()

      expect(setCookieString).toHaveBeenCalledWith(
        COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE,
        new Date(),
        COOKIE_MAX_AGE_INFINITY,
      )
    })
    it('should redirect to INSTALLED_APPS', () => {
      const mockHistory = {
        push: jest.fn(),
      }
      const fn = handleUserAccept(mockHistory)
      fn()
      expect(mockHistory.push).toBeCalledWith(routes.INSTALLED_APPS)
    })
  })
})
