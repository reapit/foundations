import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Menu as Sidebar, MenuConfig, ReapitLogo } from '@reapit/elements'
import { authLogout } from '@/actions/auth'
import { Location } from 'history'
import { FaSignOutAlt, FaCloud, FaMapMarkerAlt } from 'react-icons/fa'

export const generateMenuConfig = (logoutCallback: () => void, location: Location<any>): MenuConfig => {
  return {
    defaultActiveKey: 'GEO_DIARY',
    location,
    menu: [
      {
        key: 'LOGO',
        icon: <ReapitLogo className="nav-item-icon" />,
        type: 'LOGO',
      },
      {
        title: 'Geo Diary',
        key: 'GEO_DIARY',
        icon: <FaMapMarkerAlt className="nav-item-icon" />,
        url: '/',
        type: 'PRIMARY',
      },
      {
        title: 'Apps',
        key: 'APPS',
        icon: <FaCloud className="nav-item-icon" />,
        callback: () =>
          (window.location.href =
            window.location.href.includes('dev') || window.location.href.includes('localhost')
              ? 'https://dev.marketplace.reapit.cloud/client/installed'
              : 'https://marketplace.reapit.cloud/client/installed'),
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

export interface MenuMappedActions {
  logout: () => void
}

export interface MenuMappedState {}

export type MenuProps = MenuMappedActions & MenuMappedState & RouteComponentProps & {}

export const Menu: React.FunctionComponent<MenuProps> = ({ logout, location }) => {
  const logoutCallback = () => logout()
  const menuConfigs = generateMenuConfig(logoutCallback, location)
  return <Sidebar {...menuConfigs} location={location} />
}

export const mapDispatchToProps = (dispatch: any): MenuMappedActions => ({
  logout: () => dispatch(authLogout()),
})

export default withRouter(connect(null, mapDispatchToProps)(Menu))
