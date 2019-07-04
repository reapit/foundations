import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { ReduxState } from '@/types/core'
import { authLogout } from '@/actions/auth'
import avatarStyles from '@/styles/blocks/avatar.scss'
import { LoginType } from '@/reducers/auth'
import NavMenu from '@/constants/nav'
import Logo from '@/components/svg/logo'
import headerStyles from '@/styles/blocks/header.scss'
import bulma from '@/styles/vendor/bulma.scss'

export interface HeaderMappedProps {
  loginType: LoginType
}

export interface HeaderMappedActions {
  logout: () => void
}

export type HeaderProps = HeaderMappedProps & HeaderMappedActions & RouteComponentProps & {}

export const Header: React.FunctionComponent<HeaderProps> = ({ logout, loginType, location }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { pathname } = location

  return (
    <nav className={`${bulma.navbar} ${bulma['is-primary']}`}>
      <div className={bulma['navbar-brand']}>
        <a className={`${bulma['navbar-item']} ${headerStyles.branch}`} href="#">
          <Logo width="20px" height="25px" className="mr-2" />
          <span>Foundations</span>
        </a>
      </div>
      <div className={bulma['navbar-start']}>
        {NavMenu[loginType].map(({ to, text }) => (
          <Link className={bulma['navbar-item']} key={to} to={to}>
            {text}
          </Link>
        ))}
      </div>
      <div className={bulma['navbar-end']}>
        <div className={`${bulma['navbar-item']} ${bulma['has-dropdown']} ${isOpen ? bulma['is-active'] : ''}`}>
          <a
            className={bulma['navbar-link']}
            data-test="account-menu"
            onClick={e => {
              e.preventDefault()
              setIsOpen(!isOpen)
            }}
          >
            Account
          </a>

          <div className={`${bulma['navbar-dropdown']} ${bulma['is-right']}`}>
            <a className={bulma['navbar-item']}>Option</a>
            <a className={bulma['navbar-item']}>Option</a>
            <hr className={bulma['navbar-divider']} />
            <a
              className={bulma['navbar-item']}
              data-test="logout-cta"
              onClick={e => {
                e.preventDefault()
                logout()
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
  logout: () => dispatch(authLogout())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
)
