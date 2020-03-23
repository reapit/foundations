import * as React from 'react'
import MockDate from 'mockdate'
import { shallow } from 'enzyme'
import {
  DeveloperWelcomeMessage,
  DeveloperWelcomeMessageProps,
  handleUserAccept,
  Submitting,
  Managing,
  Support,
  Welcome,
} from '../developer-welcome'
import routes from '@/constants/routes'
import { HelpGuide } from '@reapit/elements'

jest.mock('@/utils/cookie')
import { setCookieString, COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE, COOKIE_MAX_AGE_INFINITY } from '@/utils/cookie'

const mockProps: DeveloperWelcomeMessageProps = {
  userAcceptTermAndCondition: jest.fn(),
}

describe('DeveloperWelcomeMessage', () => {
  it('should match a snapshot', () => {
    expect(shallow(<DeveloperWelcomeMessage {...mockProps} />)).toMatchSnapshot()
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

  it('Managing step should match a snapshot', () => {
    expect(
      shallow(
        <HelpGuide>
          <HelpGuide.Step id="step" component={Managing} heading="Test" subHeading="Test" />
        </HelpGuide>,
      ),
    ).toMatchSnapshot()
  })

  it('Submitting step should match a snapshot', () => {
    expect(
      shallow(
        <HelpGuide>
          <HelpGuide.Step id="step" component={Submitting} heading="Test" subHeading="Test" />
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
    it('should set COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE cookie', () => {
      const TIME_OFFSET = 0
      MockDate.set('2019-12-18T16:30:00', TIME_OFFSET)

      const mockHistory = {
        push: jest.fn(),
      }
      const fn = handleUserAccept(mockHistory)
      fn()

      expect(setCookieString).toHaveBeenCalledWith(
        COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE,
        new Date(),
        COOKIE_MAX_AGE_INFINITY,
      )
    })
    it('should redirect to DEVELOPER_MY_APPS', () => {
      const mockHistory = {
        push: jest.fn(),
      }
      const fn = handleUserAccept(mockHistory)
      fn()
      expect(mockHistory.push).toBeCalledWith(routes.DEVELOPER_MY_APPS)
    })
  })
})
