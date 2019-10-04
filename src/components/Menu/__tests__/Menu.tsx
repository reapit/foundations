import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Menu, getActiveItemKey, LinkItem } from '../Menu'
import { Location } from 'history'
import { mockMenuProps } from '../__mocks__/menu-props'

describe('Menu', () => {
  it('should render menu correctly', () => {
    const wrapper = shallow(<Menu {...mockMenuProps} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should render link item logo correctly', () => {
    const item = mockMenuProps.menu[0]
    const children = (
      <>
        <div className="nav-item-icon">{item.icon}</div>
        {item.title && <div className="nav-item-title">{item.title}</div>}
      </>
    )
    const wrapper = shallow(<LinkItem item={item} children={children} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should render link item primary correctly', () => {
    const item = mockMenuProps.menu[1]
    const children = (
      <>
        <div className="nav-item-icon">{item.icon}</div>
        {item.title && <div className="nav-item-title">{item.title}</div>}
      </>
    )
    const wrapper = shallow(<LinkItem item={item} children={children} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should render link item secondary correctly', () => {
    const item = mockMenuProps.menu[mockMenuProps.menu.length - 1]
    const children = (
      <>
        <div className="nav-item-icon">{item.icon}</div>
        {item.title && <div className="nav-item-title">{item.title}</div>}
      </>
    )
    const wrapper = shallow(<LinkItem item={item} children={children} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  describe('getActiveItemKey', () => {
    it('should return url if matches an item', () => {
      const result = getActiveItemKey(mockMenuProps.menu, { pathname: mockMenuProps.menu[1].url } as Location<any>)
      expect(result).toEqual(mockMenuProps.menu[1].key)
    })
    it('should return null if location is undefined', () => {
      const result = getActiveItemKey(mockMenuProps.menu)
      expect(result).toBeNull()
    })
    it('should return null if location does not match an item', () => {
      const result = getActiveItemKey(mockMenuProps.menu, { pathname: '/some-random-path' } as Location<any>)
      expect(result).toBeNull()
    })
  })
})
