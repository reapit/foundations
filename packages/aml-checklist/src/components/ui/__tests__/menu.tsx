import React from 'react'
import { shallow } from 'enzyme'
import { getMockRouterProps } from '@/helper/mock-router'
import { Menu, mapStateToProps, mapDispatchToProps } from '../menu'
import { LoginMode } from '@reapit/cognito-auth'
import { ReduxState } from '@/types/core'

describe('Menu', () => {
  it('should match snapshot', () => {
    const mockProps = {
      ...getMockRouterProps({} as any),
      logout: jest.fn(),
      mode: 'WEB' as LoginMode
    }
    const wrapper = shallow(<Menu {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        auth: {
          refreshSession: {
            mode: 'WEB'
          }
        }
      } as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        mode: 'WEB'
      })
    })
    it('should run correctly', () => {
      const mockState = {} as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        mode: 'WEB'
      })
    })
  })

  describe('mapDispatchToProps', () => {
    it('should render correctly', () => {
      const mockDispatch = jest.fn()
      const { logout } = mapDispatchToProps(mockDispatch)
      logout()
      expect(mockDispatch).toBeCalled()
    })
  })
})
