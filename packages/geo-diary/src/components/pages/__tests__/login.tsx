import * as React from 'react'
import { shallow } from 'enzyme'
import { Login, LoginProps, mapStateToProps } from '../login'
import { ReduxState } from '@/types/core'
import { redirectToLogin } from '@reapit/cognito-auth'
import { Button } from '@reapit/elements'

jest.mock('@reapit/cognito-auth', () => ({
  redirectToLogin: jest.fn(),
}))

describe('Login', () => {
  it('should match a snapshot', () => {
    const props: LoginProps = {
      hasSession: false,
    }

    expect(shallow(<Login {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const props: LoginProps = {
      hasSession: true,
    }

    expect(shallow(<Login {...props} />)).toMatchSnapshot()
  })

  describe('loginHandler', () => {
    it('should correctly call redirect on click', () => {
      const props: LoginProps = {
        hasSession: false,
      }
      const wrapper = shallow(<Login {...props} />)

      wrapper
        .find(Button)
        .first()
        .simulate('click')

      expect(redirectToLogin).toHaveBeenCalledTimes(1)
    })
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const mockState = {
        auth: {
          loginSession: {},
        },
      } as ReduxState
      const expected = {
        hasSession: true,
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })
})
