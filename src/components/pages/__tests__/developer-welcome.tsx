import * as React from 'react'
import { shallow } from 'enzyme'
import {
  DeveloperWelcomeMessage,
  DeveloperWelcomeMessageProps,
  handleUserAccept,
  mapDispatchToProps
} from '../developer-welcome'
import routes from '@/constants/routes'

const mockProps: DeveloperWelcomeMessageProps = {
  userAcceptTermAndCondition: jest.fn()
}

describe('DeveloperWelcomeMessage', () => {
  it('should match a snapshot when LOADING false', () => {
    expect(shallow(<DeveloperWelcomeMessage {...mockProps} />)).toMatchSnapshot()
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
