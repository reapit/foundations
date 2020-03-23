jest.mock('@/utils/cookie')

import * as React from 'react'
import { setCookieString, COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE, COOKIE_MAX_AGE_INFINITY } from '@/utils/cookie'
import MockDate from 'mockdate'
import { shallow } from 'enzyme'
import { ClientWelcomeMessage, ClientWelcomeMessageProps, handleUserAccept, Support, Welcome } from '../client-welcome'
import routes from '@/constants/routes'
import { HelpGuide } from '@reapit/elements'

const mockProps: ClientWelcomeMessageProps = {
  userAcceptTermAndCondition: jest.fn(),
}

describe('ClientWelcomeMessage', () => {
  it('should match a snapshot', () => {
    expect(shallow(<ClientWelcomeMessage {...mockProps} />)).toMatchSnapshot()
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
