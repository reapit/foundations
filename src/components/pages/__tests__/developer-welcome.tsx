import * as React from 'react'
import { shallow } from 'enzyme'
import { DeveloperWelcomeMessage, DeveloperWelcomeMessageProps, handleUserAccept } from '../developer-welcome'
import routes from '@/constants/routes'

const mockProps: DeveloperWelcomeMessageProps = {}

describe('DeveloperWelcomeMessage', () => {
  it('should match a snapshot when LOADING false', () => {
    expect(shallow(<DeveloperWelcomeMessage {...mockProps} />)).toMatchSnapshot()
  })

  describe('handleUserAccept', () => {
    it('should call dispatch', () => {
      const mockHistory = {
        push: jest.fn()
      }
      const fn = handleUserAccept(mockHistory)
      fn()
      expect(mockHistory.push).toBeCalledWith(routes.DEVELOPER_MY_APPS)
    })
  })
})
