import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import {
  Menu,
  MenuConfig,
  isActiveSubmenu,
  renderLink,
  hrefCallBack,
  MenuItem,
  renderHref,
  renderSubItem,
  handleSetToggleMenu,
  handleSetCaretToggle
} from '../Menu'
import { getMockRouterProps } from '../../../helpers/mockRouter'

describe('Menu', () => {
  it('should render correctly', () => {
    const mockLocation = getMockRouterProps({}).location
    const mockProps = {
      title: 'mockTitle',
      homeUrl: '/mockHomeUrl',
      logo: <div></div>,
      menu: [
        {
          title: 'mockMenu',
          key: '/mockMenu',
          toUrl: '/mockMenu',
          subMenu: [
            {
              title: '/mockSubmenu',
              key: '/mockSubmenu',
              callback: () => {
                return null
              }
            }
          ]
        }
      ],
      location: mockLocation,
      defaultActiveKey: '/mockSubmenu'
    } as MenuConfig
    const wrapper = shallow(<Menu {...mockProps} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should show logo', () => {
    const mockLocation = getMockRouterProps({}).location
    const mockProps = {
      title: 'mockTitle',
      homeUrl: '/mockHomeUrl',
      logo: <div data-test="logo">Logo</div>,
      menu: [
        {
          title: 'mockMenu',
          key: '/mockMenu',
          toUrl: '/mockMenu',
          subMenu: [
            {
              title: '/mockSubmenu',
              key: '/mockSubmenu',
              toUrl: '/mockSubmenu'
            }
          ]
        }
      ],
      location: mockLocation,
      defaultActiveKey: '/mockSubmenu'
    } as MenuConfig
    const wrapper = shallow(<Menu {...mockProps} />)
    const logo = wrapper.find('[data-test="logo"]')
    expect(logo).toHaveLength(1)
  })

  it('should show menu', () => {
    const mockLocation = getMockRouterProps({}).location
    const mockProps = {
      title: 'mockTitle',
      homeUrl: '/mockHomeUrl',
      logo: <div data-test="logo">Logo</div>,
      menu: [
        {
          title: 'mockMenu',
          key: '/mockMenu',
          toUrl: '/mockMenu',
          subMenu: [
            {
              title: '/mockSubmenu',
              key: '/mockSubmenu',
              toUrl: '/mockSubmenu'
            }
          ]
        }
      ],
      location: mockLocation,
      defaultActiveKey: '/mockSubmenu'
    } as MenuConfig
    const wrapper = shallow(<Menu {...mockProps} />)
    const logo = wrapper.find('[data-test="menu-label"]')
    expect(logo).toHaveLength(1)
  })

  it('should show sub-menu', () => {
    const mockLocation = getMockRouterProps({}).location
    const mockProps = {
      title: 'mockTitle',
      homeUrl: '/mockHomeUrl',
      logo: <div data-test="logo">Logo</div>,
      menu: [
        {
          title: 'mockMenu',
          key: '/mockMenu',
          toUrl: '/mockMenu',
          subMenu: [
            {
              title: '/mockSubmenu',
              key: '/mockSubmenu',
              toUrl: '/mockSubmenu'
            }
          ]
        }
      ],
      location: mockLocation,
      defaultActiveKey: '/mockSubmenu'
    } as MenuConfig
    const wrapper = shallow(<Menu {...mockProps} />)
    const subMenu = wrapper.find('[data-test="sub-menu-label"]')
    expect(subMenu).toHaveLength(1)
  })

  it('should show active menu', () => {
    const mockLocation = getMockRouterProps({}).location
    const mockProps = {
      title: 'mockTitle',
      homeUrl: '/mockHomeUrl',
      logo: <div data-test="logo">Logo</div>,
      menu: [
        {
          title: 'mockMenu',
          key: '/mockMenu',
          toUrl: '/mockMenu',
          subMenu: [
            {
              title: '/mockSubmenu',
              key: '/mockSubmenu',
              toUrl: '/mockSubmenu'
            }
          ]
        }
      ],
      location: mockLocation,
      defaultActiveKey: '/mockMenu'
    } as MenuConfig
    const wrapper = shallow(<Menu {...mockProps} />)
    const menuItem = wrapper.find('[data-test="menu-item"]')
    const caret = wrapper.find('[data-test="menu-caret"]')
    expect(menuItem.prop('className')).toEqual('"menu-list" "sub-menu" menu-is-open')
    expect(caret.prop('isActive')).toEqual(true)
  })

  it('should show active menu', () => {
    const mockLocation = getMockRouterProps({}).location
    const mockProps = {
      title: 'mockTitle',
      homeUrl: '/mockHomeUrl',
      logo: <div data-test="logo">Logo</div>,
      menu: [
        {
          title: 'mockMenu',
          key: '/mockMenu',
          toUrl: '/mockMenu',
          subMenu: [
            {
              title: '/mockSubmenu',
              key: '/mockSubmenu',
              toUrl: '/mockSubmenu'
            }
          ]
        }
      ],
      location: mockLocation,
      defaultActiveKey: '/mockMenu'
    } as MenuConfig
    const wrapper = shallow(<Menu {...mockProps} />)
    const toogleBtn = wrapper.find('[data-test="toogle-btn"]')
    toogleBtn.simulate('onChange')
    const menuBar = wrapper.find('[data-test="menu-bar"]')
    expect(menuBar.prop('className')).toEqual('"menu-bar" ')
  })
  describe('isActiveSubmenu', () => {
    it('should return true', () => {
      const result = isActiveSubmenu('/admin/admin', '/admin/admin')
      expect(result).toEqual(true)
    })
    it('should return false', () => {
      const result = isActiveSubmenu('/admin/dashboard', '/dashboard/admin')
      expect(result).toEqual(false)
    })
    it('should return false', () => {
      const result = isActiveSubmenu(undefined, '/dashboard/admin')
      expect(result).toEqual(false)
    })
    it('should return false', () => {
      const result = isActiveSubmenu('/admin/admin', undefined)
      expect(result).toEqual(false)
    })
    it('should return false', () => {
      const result = isActiveSubmenu(undefined, undefined)
      expect(result).toEqual(false)
    })
  })
  describe('renderLink', () => {
    it('should show one Link', () => {
      const result = renderLink({ toUrl: '/admin' } as MenuItem)
      expect(result).not.toBeNull()
    })
    it('should show no Link', () => {
      const result = renderLink({} as MenuItem)
      expect(result).toBeNull()
    })
  })
  describe('hrefCallBack', () => {
    it('should call func', () => {
      const mockEvent = {
        preventDefault: jest.fn()
      } as any
      const mockCallback = jest.fn()
      const fn = hrefCallBack(mockCallback)
      fn(mockEvent)
      expect(mockEvent.preventDefault).toBeCalled()
      expect(mockCallback).toBeCalled()
    })
  })

  describe('renderHref', () => {
    it('should render <a>', () => {
      const mockProps = {
        callback: jest.fn()
      } as any
      const result = renderHref(mockProps)
      expect(result).not.toBeNull()
    })
    it('should not render <a>', () => {
      const mockProps = {} as any
      const result = renderHref(mockProps)
      expect(result).toBeNull()
    })
  })
  describe('renderSubItem', () => {
    it('should render items', () => {
      const item = [
        {
          title: 'App Revisions',
          key: '/admin',
          toUrl: '/admin'
        },
        {
          title: 'Approvals',
          key: '/admin/approvals',
          toUrl: '/admin/approvals'
        }
      ]
      const location = getMockRouterProps({}).location
      const result = renderSubItem(item, location)
      expect(result).not.toBeNull()
    })
    it('should not render items', () => {
      const item = undefined
      const location = getMockRouterProps({}).location
      const result = renderSubItem(item, location)
      expect(result).toBeNull()
    })
  })
  describe('handleSetToggleMenu', () => {
    it('should call setToggleMenu', () => {
      const setToggleMenu = jest.fn()
      const isMenuOpen = true
      const fn = handleSetToggleMenu(setToggleMenu, isMenuOpen)
      fn()
      expect(setToggleMenu).toBeCalledWith(!isMenuOpen)
    })
  })
  describe('handleSetCaretToggle', () => {
    it('should call setCaretToggleKey', () => {
      const setCaretToggleKey = jest.fn()
      const mockItem = {
        title: 'Approvals',
        key: '/admin/approvals',
        toUrl: '/admin/approvals'
      }
      const fn = handleSetCaretToggle(setCaretToggleKey, mockItem)
      fn()
      expect(setCaretToggleKey).toBeCalledWith(mockItem.key)
    })
  })
})
