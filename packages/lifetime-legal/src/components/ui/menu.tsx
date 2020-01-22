import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Menu as Sidebar, MenuConfig, ReapitLogo } from '@reapit/elements'
import { LoginMode } from '@reapit/cognito-auth'
import Routes from '@/constants/routes'
import { authLogout } from '@/actions/auth'
import { Location } from 'history'
import { ReduxState } from '@/types/core'
import { FaCloud, FaSignOutAlt, FaSearch, FaList } from 'react-icons/fa'

export const generateMenuConfig = (
  logoutCallback: () => void,
  location: Location<any>,
  mode: LoginMode,
): MenuConfig => {
  return {
    defaultActiveKey: 'CLIENT_SEARCH',
    mode,
    location,
    menu: [
      {
        key: 'LOGO',
        icon: <ReapitLogo className="nav-item-icon" />,
        type: 'LOGO',
      },
      {
        title: 'Search',
        key: 'CLIENT_SEARCH',
        icon: <FaSearch className="nav-item-icon" />,
        url: Routes.HOME,
        type: 'PRIMARY',
      },
      {
        title: 'Results',
        key: 'SEARCH_RESULTS',
        icon: <FaList className="nav-item-icon" />,
        url: Routes.RESULTS,
        type: 'PRIMARY',
      },
      {
        title: 'Apps',
        key: 'APPS',
        icon: <FaCloud className="nav-item-icon" />,
        callback: () =>
          (window.location.href = !window.location.href.includes('dev')
            ? 'https://marketplace.reapit.com/client/installed'
            : 'https://dev.marketplace.reapit.com/client/installed'),
        type: 'PRIMARY',
      },
      {
        title: 'Logout',
        key: 'LOGOUT',
        callback: logoutCallback,
        icon: <FaSignOutAlt className="nav-item-icon" />,
        type: 'SECONDARY',
      },
    ],
  }
}

export type MenuProps = RouteComponentProps & {
  logout: () => void
  mode: LoginMode
}

export const Menu: React.FunctionComponent<MenuProps> = ({ location, logout, mode }: MenuProps) => {
  const menuConfigs = generateMenuConfig(logout, location, mode)
  return <Sidebar {...menuConfigs} location={location} />
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logout: () => dispatch(authLogout()),
  }
}

export const mapStateToProps = (state: ReduxState) => ({
  mode: state?.auth?.refreshSession?.mode || 'WEB',
})

export const MenuWithRedux = connect(mapStateToProps, mapDispatchToProps)(Menu)
MenuWithRedux.displayName = 'MenuWithRedux'

export const MenuWithRouter = withRouter(MenuWithRedux)
MenuWithRouter.displayName = 'MenuWithRouter'

export default MenuWithRouter
