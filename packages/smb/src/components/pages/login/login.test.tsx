import * as React from 'react'
import { mount } from 'enzyme'
import { RouteComponentProps } from 'react-router'
import { MockedProvider } from '@apollo/react-testing'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'
import { loginParams, token } from '@/graphql/__mocks__/token'
import Routes from '@/constants/routes'
import { Login, handleOnSubmit, handleOnCompleted, LoginResponse } from './login'
import LOGIN from './login.graphql'

const mockQueries = {
  request: {
    query: LOGIN,
    variables: loginParams,
  },
  result: {
    data: token,
  },
}

describe('Login', () => {
  describe('Login', () => {
    it('should match a snapshot', () => {
      const props = getMockRouterProps({ params: {}, search: '' }) as RouteComponentProps
      const wrapper = mount(
        <MockedProvider mocks={[mockQueries]} addTypename={true}>
          <Login {...props} />
        </MockedProvider>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('handleOnSubmit', () => {
    it('should run correctly', () => {
      const mockParams = {
        login: jest.fn(),
      }
      const fn = handleOnSubmit(mockParams)
      fn(loginParams)
      expect(mockParams.login).toBeCalledWith({ variables: loginParams })
    })
  })

  describe('handleOnCompleted', () => {
    it('should run correctly', () => {
      const mockParams = {
        history: {
          replace: jest.fn(),
        },
      }
      const fn = handleOnCompleted(mockParams)
      fn({ login: { ...token } } as LoginResponse)
      expect(mockParams.history.replace).toBeCalledWith(Routes.HOME)
    })
  })
})
