import * as React from 'react'
import { RouteProps } from 'react-router'
import { Link } from 'react-router-dom'
import { Location } from 'history'

export interface MenuConfig extends RouteProps {
  defaultActiveKey: string
  mode: 'DESKTOP' | 'WEB'
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
    const activeItem = menu.find(item => {
      const isExactRoot = location.pathname === '/' && item.url === '/'
      const isNotRootAndHasCommonPrefix = item.url && item.url !== '/' && location.pathname.startsWith(item.url)
      return isExactRoot || isNotRootAndHasCommonPrefix
    })

    if (activeItem && activeItem.url) {
      return activeItem.key
    }
  }
  return null
}

export const LinkItem: React.SFC<{
  item: MenuItem
  children: React.ReactNode
  activeItemRef?: React.RefObject<HTMLAnchorElement & Link>
}> = ({ item, children, activeItemRef }) =>
  item.url ? (
    <Link
      ref={activeItemRef}
      className={`nav-item-link ${
        item.type === 'LOGO' ? 'is-logo' : item.type === 'SECONDARY' ? 'is-secondary' : 'is-primary'
      }`}
      to={item.url}
    >
      {children}
    </Link>
  ) : item.callback ? (
    <a
      ref={activeItemRef}
      className={`nav-item-link ${
        item.type === 'LOGO' ? 'is-logo' : item.type === 'SECONDARY' ? 'is-secondary' : 'is-primary'
      }`}
      onClick={item.callback}
    >
      {children}
    </a>
  ) : (
    <span
      className={`nav-item-link ${
        item.type === 'LOGO' ? 'is-logo' : item.type === 'SECONDARY' ? 'is-secondary' : 'is-primary'
      }`}
    >
      {children}
    </span>
  )

export const Menu: React.FC<MenuConfig> = React.memo(({ menu, location, mode, defaultActiveKey }) => {
  const activeItem = getActiveItemKey(menu, location)
  const [activeKey, setIsActive] = React.useState(activeItem || defaultActiveKey)
  const activeItemRef = React.createRef<HTMLAnchorElement & Link>()

  React.useEffect(() => {
    setIsActive(activeItem || defaultActiveKey)
  }, [activeItem])

  // Auto scroll to the position of active item
  React.useEffect(() => {
    const element = activeItemRef.current
    if (element) {
      element.scrollIntoView()
    }
  }, [activeKey])

  return (
    <nav className={`nav-bar ${mode === 'DESKTOP' ? 'is-desktop' : ''}`}>
      <ul>
        {menu.map((item: MenuItem) => (
          <LinkItem activeItemRef={activeKey === item.key ? activeItemRef : undefined} key={item.key} item={item}>
            <li
              className={`nav-item ${activeKey === item.key ? 'is-active' : ''}`}
              onClick={() => item.type !== 'LOGO' && setIsActive(item.key)}
            >
              <div>{item.icon}</div>
              {item.title && <div className="nav-item-title">{item.title}</div>}
            </li>
          </LinkItem>
        ))}
      </ul>
    </nav>
  )
})
