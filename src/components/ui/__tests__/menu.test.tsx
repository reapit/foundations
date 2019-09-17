import React from 'react'
import { shallow } from 'enzyme'
import { getMockRouterProps } from '@/helper/mock-router'
import { Menu } from '../menu'

describe('Menu', () => {
  it('should match snapshot', () => {
    const mockProps = {
      ...getMockRouterProps({} as any),
      logout: jest.fn()
    }
    const wrapper = shallow(<Menu {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
