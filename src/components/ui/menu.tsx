import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps, RouteProps } from 'react-router'
import { Link } from 'react-router-dom'
import { ReduxState } from '@/types/core'
import { authLogout } from '@/actions/auth'
import { LoginType } from '@/reducers/auth'
import NavMenu from '@/constants/nav'
import Logo from '@/components/svg/logo'
import menuStyles from '@/styles/blocks/menu.scss?mod'
import bulma from '@/styles/vendor/bulma'
import Routes from '../../constants/routes'
import Toggle from './toggle'
import Caret from './caret'

interface MenuConfig extends RouteProps {
  title: string
  logo: React.ReactNode
  homeUrl: string
  defaultActiveKey?: string
  menu: MenuItem[]
}
interface MenuItem {
  title: string
  key: string
  callback?: () => void
  toUrl?: string
  subMenu?: MenuItem[]
}

const isActiveSubmenu = (pathname, itemUrl) => {
  const isValidParams = !!pathname && !!itemUrl
  if (!isValidParams) {
    return false
  }
  return pathname.split('/')[2] === itemUrl.split('/')[2]
}

const renderLink = (subItem: MenuItem) => {
  if (subItem.toUrl) {
    return <Link to={subItem.toUrl}>{subItem.title}</Link>
  }
  return null
}

const hrefCallBack = (callback: Function) => (e: React.SyntheticEvent) => {
  e.preventDefault()
  callback()
}

const renderHref = (subItem: MenuItem) => {
  if (subItem.callback) {
    return (
      <a data-test="logout-cta" onClick={hrefCallBack(subItem.callback)}>
        Logout
      </a>
    )
  }
  return null
}

const renderSubItem = (items: MenuItem[] | undefined, location) => {
  if (!items) {
    return null
  }
  return items.map((subItem: MenuItem) => {
    return (
      <li key={subItem.key} className={isActiveSubmenu(location.pathname, subItem.toUrl) ? menuStyles.isActive : ''}>
        {subItem.toUrl ? renderLink(subItem) : renderHref(subItem)}
      </li>
    )
  })
}

export const generateMenuConfig = logoutCallback => {
  return {
    ADMIN: {
      title: 'Foundations',
      logo: <Logo />,
      homeUrl: '/home',
      defaultActiveKey: 'Apps',
      menu: [
        {
          title: 'Apps',
          key: 'Apps',
          subMenu: [
            {
              title: 'Approvals',
              key: '/admin/approvals',
              toUrl: '/admin/approvals'
            }
          ]
        },
        {
          title: 'Account',
          key: 'Account',
          subMenu: [
            {
              title: 'Logout',
              key: '/logout',
              callback: logoutCallback
            }
          ]
        }
      ]
    },
    DEVELOPER: {
      title: 'Foundations',
      logo: <Logo />,
      homeUrl: '/home',
      defaultActiveKey: 'Apps',
      menu: [
        {
          title: 'Apps',
          key: 'Apps',
          subMenu: [
            {
              title: 'Manage Apps',
              key: '/developer/apps',
              toUrl: '/developer/apps'
            },
            {
              title: 'API Documentation',
              key: '/developer/api-docs',
              toUrl: '/developer/api-docs'
            },
            {
              title: 'Submit Apps',
              key: '/developer/submit-app',
              toUrl: '/developer/submit-app'
            }
          ]
        },
        {
          title: 'Account',
          key: 'Account',
          subMenu: [
            {
              title: 'Logout',
              key: '/logout',
              callback: logoutCallback
            }
          ]
        }
      ]
    },
    CLIENT: {
      title: 'Foundations',
      logo: <Logo />,
      homeUrl: '/home',
      defaultActiveKey: 'Apps',
      menu: [
        {
          title: 'Apps',
          key: 'Apps',
          subMenu: [
            {
              title: 'Browse Apps',
              key: '/client/apps',
              toUrl: '/client/apps'
            },
            {
              title: 'Installed Apps',
              key: '/client/installed',
              toUrl: '/client/installed'
            }
          ]
        },
        {
          title: 'Account',
          key: 'Account',
          subMenu: [
            {
              title: 'Logout',
              key: '/logout',
              callback: logoutCallback
            }
          ]
        }
      ]
    }
  }
}

export const MenuDynamic: React.FC<MenuConfig> = ({ title, homeUrl, logo, menu, location, defaultActiveKey }) => {
  const [isOpen, setIsOpen] = React.useState(true)
  const [caretToggle, setCaretToggle] = React.useState(defaultActiveKey)
  return (
    <aside className={`${bulma.menu}`}>
      <Link className={menuStyles.logo} to={homeUrl}>
        {logo}
        <h5 className={`${bulma.title} ${bulma.is5}`}>{title}</h5>
      </Link>
      <div className={menuStyles.toggleContainer}>
        <Toggle onChange={(_e: React.ChangeEvent<HTMLInputElement>) => setIsOpen(!isOpen)} isChecked={isOpen} />
      </div>
      <div className={`${menuStyles.menuBar} ${isOpen ? menuStyles.menuIsOpen : ''}`}>
        {menu.map((item: MenuItem) => {
          return (
            <React.Fragment key={item.key}>
              <p className={`${bulma.menuLabel} ${menuStyles.subMenuLabel}`} onClick={_e => setCaretToggle(item.key)}>
                <Caret isActive={caretToggle === item.key} />
                {item.title}
              </p>
              <ul
                className={`${bulma.menuList} ${menuStyles.subMenu} ${
                  caretToggle === item.key ? menuStyles.menuIsOpen : ''
                }`}
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

export interface MenuMappedProps {
  loginType: LoginType
}

export interface MenuMappedActions {
  logout: (loginType: LoginType) => void
}

export type MenuProps = MenuMappedProps & MenuMappedActions & RouteComponentProps & {}

export const Menu: React.FunctionComponent<MenuProps> = ({ logout, loginType, location }) => {
  const logoutCallback = () => logout(loginType)
  const menuConfigs = generateMenuConfig(logoutCallback)
  return <MenuDynamic {...menuConfigs[loginType]} location={location} />
}

export const mapStateToProps = (state: ReduxState): MenuMappedProps => ({
  loginType: state.auth.loginType
})

export const mapDispatchToProps = (dispatch: any): MenuMappedActions => ({
  logout: (loginType: LoginType) => dispatch(authLogout(loginType))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Menu)
)
