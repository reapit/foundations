import * as React from 'react'
import { RouteProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Location } from 'history'
import { LoginMode } from '../../utils/cognito/types'

export interface MenuConfig extends RouteProps {
  defaultActiveKey: string
  mode: LoginMode
  menu: MenuItem[]
}

export interface MenuItem {
  type: 'PRIMARY' | 'SECONDARY' | 'LOGO'
  title?: string
  key: string
  icon: React.ReactNode
  url?: string
  callback?: () => void
}

export const getActiveItemKey = (menu: MenuItem[], location?: Location<any>): string | null => {
  if (location && location.pathname) {
    const activeItem = menu.find(item => location.pathname === item.url)
    if (activeItem && activeItem.url) {
      return activeItem.key
    }
  }
  return null
}

export const LinkItem: React.SFC<{ item: MenuItem; children: React.ReactNode }> = ({ item, children }) =>
  item.url ? (
    <Link className="nav-item-link" to={item.url}>
      {children}
    </Link>
  ) : item.callback ? (
    <a className="nav-item-link" onClick={item.callback}>
      {children}
    </a>
  ) : (
    <span className="nav-item-link">{children}</span>
  )

export const Menu: React.FC<MenuConfig> = React.memo(({ menu, location, mode, defaultActiveKey }) => {
  const activeItem = getActiveItemKey(menu, location)
  const [activeKey, setIsActive] = React.useState(activeItem || defaultActiveKey)
  return (
    <nav className={`nav-bar ${mode === 'DESKTOP' ? 'is-desktop' : ''}`}>
      <ul>
        {menu.map((item: MenuItem) => (
          <li
            className={`nav-item ${activeKey === item.key ? 'is-active' : ''} ${
              item.type === 'LOGO' ? 'is-logo' : item.type === 'SECONDARY' ? 'is-secondary' : 'is-primary'
            }`}
            key={item.key}
            onClick={() => item.type !== 'LOGO' && setIsActive(item.key)}
          >
            <LinkItem item={item}>
              <div>{item.icon}</div>
              {item.title && <div className="nav-item-title">{item.title}</div>}
            </LinkItem>
          </li>
        ))}
      </ul>
    </nav>
  )
})
