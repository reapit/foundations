import * as React from 'react'
import { shallow } from 'enzyme'
import {
  DeveloperWelcomeMessage,
  DeveloperWelcomeMessageProps,
  handleUserAccept,
  mapDispatchToProps,
  Documentation,
  Submitting,
  Managing,
  Support,
  Welcome
} from '../developer-welcome'
import routes from '@/constants/routes'
import { HelpGuide } from '@reapit/elements'

const mockProps: DeveloperWelcomeMessageProps = {
  userAcceptTermAndCondition: jest.fn()
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
        </HelpGuide>
      )
    ).toMatchSnapshot()
  })

  it('Managing step should match a snapshot', () => {
    expect(
      shallow(
        <HelpGuide>
          <HelpGuide.Step id="step" component={Managing} heading="Test" subHeading="Test" />
        </HelpGuide>
      )
    ).toMatchSnapshot()
  })

  it('Submitting step should match a snapshot', () => {
    expect(
      shallow(
        <HelpGuide>
          <HelpGuide.Step id="step" component={Submitting} heading="Test" subHeading="Test" />
        </HelpGuide>
      )
    ).toMatchSnapshot()
  })

  it('Support step should match a snapshot', () => {
    expect(
      shallow(
        <HelpGuide>
          <HelpGuide.Step id="step" component={Support} heading="Test" subHeading="Test" />
        </HelpGuide>
      )
    ).toMatchSnapshot()
  })

  it('Welcome step should match a snapshot', () => {
    expect(
      shallow(
        <HelpGuide>
          <HelpGuide.Step id="step" component={Welcome} heading="Test" subHeading="Test" />
        </HelpGuide>
      )
    ).toMatchSnapshot()
  })

  describe('handleUserAccept', () => {
    it('should call dispatch', () => {
      const mockUserAcceptTermAndCondition = jest.fn()
      const mockHistory = {
        push: jest.fn()
      }
      const fn = handleUserAccept(mockUserAcceptTermAndCondition, mockHistory)
      fn()
      expect(mockUserAcceptTermAndCondition).toBeCalled()
      expect(mockHistory.push).toBeCalledWith(routes.DEVELOPER_MY_APPS)
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
