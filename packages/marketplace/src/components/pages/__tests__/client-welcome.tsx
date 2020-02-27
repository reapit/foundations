import * as React from 'react'
import { shallow } from 'enzyme'
import {
  ClientWelcomeMessage,
  ClientWelcomeMessageProps,
  handleUserAccept,
  mapDispatchToProps,
  Support,
  Welcome,
} from '../client-welcome'
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
    it('should call dispatch', () => {
      const mockUserAcceptTermAndCondition = jest.fn()
      const mockHistory = {
        push: jest.fn(),
      }
      const fn = handleUserAccept(mockUserAcceptTermAndCondition, mockHistory)
      fn()
      expect(mockUserAcceptTermAndCondition).toBeCalled()
      expect(mockHistory.push).toBeCalledWith(routes.INSTALLED_APPS)
    })
  })

  describe('mapDispatchToProps', () => {
    describe('login', () => {
      it('should call dispatch correctly', () => {
        const mockDispatch = jest.fn()
        const { userAcceptTermAndCondition } = mapDispatchToProps(mockDispatch)
        userAcceptTermAndCondition()
        expect(mockDispatch).toBeCalled()
      })
    })
  })
})
