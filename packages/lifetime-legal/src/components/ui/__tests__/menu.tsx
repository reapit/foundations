import React from 'react'
import { shallow } from 'enzyme'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'
import { Menu } from '../menu'
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
})
