import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import { ReduxState } from '@/types/core'
import { authLogout } from '@/actions/auth'
import { StyledAvatar } from '@/styles/blocks/avatar'
import { LoginType } from '@/reducers/auth'
import NavMenu from '@/constants/nav'
import Logo from '@/components/svg/logo'
import { StyledNavBranch } from '@/styles/blocks/header'

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
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <StyledNavBranch className="navbar-brand" href="#">
          <Logo width="20px" height="25px" className="mr-2" />
          <span>Marketplace</span>
        </StyledNavBranch>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {NavMenu[loginType].map(({ to, text }) => (
              <li className={'nav-item' + (to === pathname ? ' active' : '')} key={to}>
                <Link className="nav-link" to={to}>
                  {text}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <div className="pt-2 pb-1">
                <StyledAvatar
                  className="avatar"
                  href="#"
                  onClick={e => {
                    e.preventDefault()
                    setIsOpen(!isOpen)
                  }}
                />
              </div>
              <div
                className={'dropdown-menu dropdown-menu-right' + (isOpen ? ' show' : '')}
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a
                  className="dropdown-item logout-link"
                  href="#"
                  onClick={e => {
                    e.preventDefault()
                    logout()
                  }}
                >
                  Logout
                </a>
              </div>
            </li>
          </ul>
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
