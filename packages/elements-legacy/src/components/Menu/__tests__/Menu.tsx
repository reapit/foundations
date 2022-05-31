import React from 'react'
import { render } from '@testing-library/react'
import { Menu, getActiveItemKey, LinkItem } from '../index'
import { Location } from 'history'
import { mockMenuProps } from '../__mocks__/menu-props'
import { createBrowserHistory, History } from 'history'
import { Router } from 'react-router'

jest.mock('../../DynamicLinks', () => ({
  ...(jest.requireActual('../../DynamicLinks') as Object),
  getMarketplaceGlobalsByKey: jest.fn(() => ({})),
}))

const history: History<any> = createBrowserHistory()

describe('Menu', () => {
  it('should render menu correctly', () => {
    const wrapper = render(
      <Router history={history}>
        <Menu {...mockMenuProps} />
      </Router>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render menu correctly when mode prop is undefined', () => {
    const wrapper = render(
      <Router history={history}>
        <Menu {...mockMenuProps} mode={undefined} />
      </Router>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render link item logo correctly', () => {
    const item = mockMenuProps.menu[0]
    const children = (
      <>
        <div className="nav-item-icon">{item.icon}</div>
        {item.title && <div className="nav-item-title">{item.title}</div>}
      </>
    )
    const wrapper = render(
      <Router history={history}>
        <LinkItem item={item}>{children}</LinkItem>
      </Router>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render link item primary correctly', () => {
    const item = mockMenuProps.menu[1]
    const children = (
      <>
        <div className="nav-item-icon">{item.icon}</div>
        {item.title && <div className="nav-item-title">{item.title}</div>}
      </>
    )
    const wrapper = render(
      <Router history={history}>
        <LinkItem item={item}>{children}</LinkItem>
      </Router>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render link item secondary correctly', () => {
    const item = mockMenuProps.menu[mockMenuProps.menu.length - 1]
    const children = (
      <>
        <div className="nav-item-icon">{item.icon}</div>
        {item.title && <div className="nav-item-title">{item.title}</div>}
      </>
    )
    const wrapper = render(
      <Router history={history}>
        <LinkItem item={item}>{children}</LinkItem>
      </Router>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('getActiveItemKey', () => {
    it('should return url if matches an item', () => {
      const result = getActiveItemKey(mockMenuProps.menu, {
        pathname: mockMenuProps.menu[1].url,
      } as Location<any>)
      expect(result).toEqual(mockMenuProps.menu[1].key)
    })
    it('should return null if location is undefined', () => {
      const result = getActiveItemKey(mockMenuProps.menu)
      expect(result).toBeNull()
    })
    it('should return null if location does not match an item', () => {
      const result = getActiveItemKey(mockMenuProps.menu, {
        pathname: '/some-random-path',
      } as Location<any>)
      expect(result).toBeNull()
    })
    it('should default back to defaultActiveKey if pathname === /', () => {
      const result = getActiveItemKey(mockMenuProps.menu, { pathname: '/' } as Location<any>)
      expect(result).toBe(null)
    })
  })
})
