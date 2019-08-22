import * as React from 'react'
import { RouteProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Toggle } from './Toggle'
import { Caret } from './Caret'

export interface MenuConfig extends RouteProps {
  title: string
  logo: React.ReactNode
  homeUrl: string
  defaultActiveKey?: string
  menu: MenuItem[]
}

export interface MenuItem {
  title: string
  key: string
  callback?: () => void
  toUrl?: string
  subMenu?: MenuItem[]
}

export const isActiveSubmenu = (pathname, itemUrl) => {
  const isValidParams = !!pathname && !!itemUrl
  if (!isValidParams) {
    return false
  }
  return pathname === itemUrl
}

export const renderLink = (subItem: MenuItem) => {
  if (subItem.toUrl) {
    return <Link to={subItem.toUrl}>{subItem.title}</Link>
  }
  return null
}

export const hrefCallBack = (callback: Function) => (e: React.SyntheticEvent) => {
  e.preventDefault()
  callback()
}

export const renderHref = (subItem: MenuItem) => {
  if (subItem.callback) {
    return (
      <a data-test="logout-cta" onClick={hrefCallBack(subItem.callback)}>
        Logout
      </a>
    )
  }
  return null
}

export const renderSubItem = (items: MenuItem[] | undefined, location) => {
  if (!items) {
    return null
  }
  return items.map((subItem: MenuItem) => {
    return (
      <li
        data-test="sub-menu-label"
        key={subItem.key}
        className={isActiveSubmenu(location.pathname, subItem.toUrl) ? 'is-active' : ''}
      >
        {subItem.toUrl ? renderLink(subItem) : renderHref(subItem)}
      </li>
    )
  })
}

export const handleSetToggleMenu = (setToggleMenu, isMenuOpen) => () => setToggleMenu(!isMenuOpen)

export const handleSetCaretToggle = (setCaretToggleKey, item) => () => setCaretToggleKey(item.key)

export const Menu: React.FC<MenuConfig> = ({ title, homeUrl, logo, menu, location, defaultActiveKey }) => {
  const [isMenuOpen, setToggleMenu] = React.useState(false)
  const [caretToggleKey, setCaretToggleKey] = React.useState(defaultActiveKey)
  return (
    <aside className="menu">
      <Link className="logo" to={homeUrl}>
        {logo}
        <h5 className="title .is5">{title}</h5>
      </Link>
      <div className="toggle-container">
        <Toggle
          data-test="toogle-btn"
          onChange={handleSetToggleMenu(setToggleMenu, isMenuOpen)}
          isChecked={isMenuOpen}
        />
      </div>
      <div data-test="menu-bar" className={`"menu-bar" ${isMenuOpen ? 'menu-is-open' : ''}`}>
        {menu.map((item: MenuItem) => {
          return (
            <React.Fragment key={item.key}>
              <p
                data-test="menu-label"
                className="menu-label sub-menu-label"
                onClick={handleSetCaretToggle(setCaretToggleKey, item)}
              >
                <Caret data-test="menu-caret" isActive={caretToggleKey === item.key} />
                {item.title}
              </p>
              <ul
                data-test="menu-item"
                className={`"menu-list" "sub-menu" ${caretToggleKey === item.key ? 'menu-is-open' : ''}`}
              >
                {renderSubItem(item.subMenu, location)}
              </ul>
            </React.Fragment>
          )
        })}
      </div>
    </aside>
  )
}
