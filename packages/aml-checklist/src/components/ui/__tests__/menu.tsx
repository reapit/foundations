import React from 'react'
import { shallow } from 'enzyme'
import { getMockRouterProps } from '@/helper/mock-router'
import { Menu, mapDispatchToProps } from '../menu'
import { LoginMode } from '@reapit/cognito-auth'

describe('Menu', () => {
  it('should match snapshot', () => {
    const mockProps = {
      ...getMockRouterProps({} as any),
      logout: jest.fn(),
      mode: 'WEB' as LoginMode,
    }
    const wrapper = shallow(<Menu {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
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
