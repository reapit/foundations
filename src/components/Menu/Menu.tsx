import * as React from 'react'
import { RouteProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Toggle } from './Toggle'
import { Caret } from './Caret'
import { Location } from 'history'

export interface MenuConfig extends RouteProps {
  title: string
  logo: React.ReactNode
  homeUrl: string
  defaultActiveKey?: string
  menu: MenuItem[]
  isResponsive?: boolean
}

export interface MenuItem {
  title: string
  key: string
  callback?: () => void
  toUrl?: string
  subMenu?: MenuItem[]
}

export const isActiveSubmenu = (pathname: string, itemUrl: string) => {
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

export const renderSubItem = (items: MenuItem[] | undefined, location: Location) => {
  if (!items) {
    return null
  }
  return items.map((subItem: MenuItem) => {
    return (
      <li
        data-test="sub-menu-label"
        key={subItem.key}
        className={isActiveSubmenu(location.pathname, subItem.toUrl || '') ? 'is-active' : ''}
      >
        {subItem.toUrl ? renderLink(subItem) : renderHref(subItem)}
      </li>
    )
  })
}

export const handleSetToggleMenu = (setToggleMenu: (isMenuOpen: boolean) => void, isMenuOpen: boolean) => () =>
  setToggleMenu(!isMenuOpen)

export const handleSetCaretToggle = (setCaretToggleKey: (key: string) => void, item: MenuItem) => () =>
  setCaretToggleKey(item.key)

export const Menu: React.FC<MenuConfig> = ({
  title,
  homeUrl,
  logo,
  menu,
  location,
  defaultActiveKey,
  isResponsive = true
}) => {
  const [isMenuOpen, setToggleMenu] = React.useState(false)
  const [caretToggleKey, setCaretToggleKey] = React.useState(defaultActiveKey)
  return (
    <aside className={`menu ${isResponsive ? 'is-responsive' : ''}`}>
      <Link className={`logo ${isResponsive ? 'is-responsive' : ''}`} to={homeUrl}>
        {logo}
        <h5 className="title is-5">{title}</h5>
      </Link>
      <div className="toggle-container">
        <Toggle
          data-test="toogle-btn"
          onChange={handleSetToggleMenu(setToggleMenu, isMenuOpen)}
          isChecked={isMenuOpen}
          isResponsive={isResponsive}
        />
      </div>
      <div
        data-test="menu-bar"
        className={`menu-bar ${isMenuOpen ? 'menu-is-open' : ''} ${isResponsive ? 'is-responsive' : ''}`}
      >
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
                className={`menu-list sub-menu ${caretToggleKey === item.key ? 'menu-is-open' : ''}`}
              >
                {renderSubItem(item.subMenu, location as Location)}
              </ul>
            </React.Fragment>
          )
        })}
      </div>
    </aside>
  )
}
