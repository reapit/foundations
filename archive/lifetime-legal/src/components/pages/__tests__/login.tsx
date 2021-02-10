import * as React from 'react'
import { shallow } from 'enzyme'
import { Login, LoginProps, mapStateToProps } from '@/components/pages/login'
import { ReduxState } from '@/types/core'

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

    it('should run correctly', () => {
      const mockState = {
        auth: {
          loginSession: null,
        },
      } as ReduxState
      const expected = {
        hasSession: false,
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })
})
