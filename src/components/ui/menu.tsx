import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
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

export interface MenuMappedProps {
  loginType: LoginType
}

export interface MenuMappedActions {
  logout: (loginType: LoginType) => void
}

export type MenuProps = MenuMappedProps & MenuMappedActions & RouteComponentProps & {}

export const Menu: React.FunctionComponent<MenuProps> = ({ logout, loginType, location }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const [caretToggle, setCaretToggle] = React.useState('APPS')
  const { pathname } = location
  const { logo, menuIsOpen, menuBar, toggleContainer, isActive, subMenu, subMenuLabel } = menuStyles
  const { menu, menuLabel, menuList, title, is5 } = bulma
  const { CLIENT, DEVELOPER, ADMIN } = Routes

  return (
    <aside className={`${menu}`}>
      <Link className={logo} to={loginType === 'CLIENT' ? CLIENT : loginType === 'DEVELOPER' ? DEVELOPER : ADMIN}>
        <Logo width="150px" height="65px" />
        <h5 className={`${title} ${is5}`}>Foundations</h5>
      </Link>
      <div className={toggleContainer}>
        <Toggle onChange={(_e: React.ChangeEvent<HTMLInputElement>) => setIsOpen(!isOpen)} isChecked={isOpen} />
      </div>
      <div className={`${menuBar} ${isOpen ? menuIsOpen : ''}`}>
        <p
          className={`${menuLabel} ${subMenuLabel}`}
          onClick={_e => setCaretToggle(caretToggle === 'APPS' ? 'NONE' : 'APPS')}
        >
          <Caret isActive={caretToggle === 'APPS'} />
          Apps
        </p>
        <ul className={`${menuList} ${subMenu} ${caretToggle === 'APPS' ? menuIsOpen : ''}`}>
          {NavMenu[loginType].map(({ to, text }) => (
            <li key={to} className={pathname.split('/')[2] === to.split('/')[2] ? isActive : ''}>
              <Link to={to}>{text}</Link>
            </li>
          ))}
        </ul>
        <p
          className={`${menuLabel} ${subMenuLabel}`}
          onClick={_e => setCaretToggle(caretToggle === 'ACCOUNT' ? 'NONE' : 'ACCOUNT')}
        >
          <Caret isActive={caretToggle === 'ACCOUNT'} />
          Account
        </p>
        <ul className={`${menuList} ${subMenu} ${caretToggle === 'ACCOUNT' ? menuIsOpen : ''}`}>
          <li className={isActive}>
            <a
              data-test="logout-cta"
              onClick={e => {
                e.preventDefault()
                logout(loginType)
              }}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </aside>
  )
}

const mapStateToProps = (state: ReduxState): MenuMappedProps => ({
  loginType: state.auth.loginType
})

const mapDispatchToProps = (dispatch: any): MenuMappedActions => ({
  logout: (loginType: LoginType) => dispatch(authLogout(loginType))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Menu)
)
