import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { ReduxState } from '@/types/core'
import { authLogout } from '@/actions/auth'
import { LoginType } from '@/reducers/auth'
import NavMenu from '@/constants/nav'
import Logo from '@/components/svg/logo'
import headerStyles from '@/styles/blocks/header.scss?mod'
import bulma from '@/styles/vendor/bulma'

export interface HeaderMappedProps {
  loginType: LoginType
}

export interface HeaderMappedActions {
  logout: (loginType: LoginType) => void
}

export type HeaderProps = HeaderMappedProps & HeaderMappedActions & RouteComponentProps & {}

export const Header: React.FunctionComponent<HeaderProps> = ({ logout, loginType, location }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { pathname } = location
  const { branch } = headerStyles
  const {
    navbar,
    isPrimary,
    navbarBrand,
    navbarItem,
    navbarLink,
    navbarDropdown,
    navbarDivider,
    navbarStart,
    navbarEnd,
    isActive,
    isRight,
    hasDropdown
  } = bulma

  return (
    <nav className={`${navbar} ${isPrimary}`}>
      <div className={navbarBrand}>
        <a className={`${navbarItem} ${branch}`} href="#">
          <Logo width="150px" height="65px" />
          <span>Foundations</span>
        </a>
      </div>
      <div className={navbarStart}>
        {NavMenu[loginType].map(({ to, text }) => (
          <Link className={navbarItem} key={to} to={to}>
            {text}
          </Link>
        ))}
      </div>
      <div className={navbarEnd}>
        <div className={`${navbarItem} ${hasDropdown} ${isOpen ? isActive : ''}`}>
          <a
            className={navbarLink}
            data-test="account-menu"
            onClick={e => {
              e.preventDefault()
              setIsOpen(!isOpen)
            }}
          >
            Account
          </a>

          <div className={`${navbarDropdown} ${isRight}`}>
            <a className={navbarItem}>Option</a>
            <a className={navbarItem}>Option</a>
            <hr className={navbarDivider} />
            <a
              className={navbarItem}
              data-test="logout-cta"
              onClick={e => {
                e.preventDefault()
                logout(loginType)
              }}
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

const mapStateToProps = (state: ReduxState): HeaderMappedProps => ({
  loginType: state.auth.loginType
})

const mapDispatchToProps = (dispatch: any): HeaderMappedActions => ({
  logout: (loginType: LoginType) => dispatch(authLogout(loginType))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
)
