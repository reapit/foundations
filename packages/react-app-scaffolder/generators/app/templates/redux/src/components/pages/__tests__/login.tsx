import * as React from 'react'
import { shallow } from 'enzyme'
import { Login, LoginProps, mapStateToProps } from '@/components/pages/login'
import { ReduxState } from '@/types/core'
import { redirectToLogin } from '@reapit/cognito-auth'
import { Button } from '@reapit/elements'

const props = (hasSession: boolean): LoginProps => ({
  hasSession,
  // @ts-ignore: just pick the needed props for the test
  history: {},
})

jest.mock('@reapit/cognito-auth', () => ({
  redirectToLogin: jest.fn(),
}))

describe('Login', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Login {...props(false)} />)).toMatchSnapshot()
  })

  it('should match a snapshot when hasSession', () => {
    expect(shallow(<Login {...props(true)} />)).toMatchSnapshot()
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
      // @ts-ignore: only pick necessary props
      const mockState = {
        auth: {
          refreshSession: null,
          loginSession: null,
        },
      } as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        hasSession: false,
      })
    })

    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        auth: {
          refreshSession: {},
          loginSession: null,
        },
      } as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        hasSession: true,
      })
    })
  })
})
