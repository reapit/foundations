import * as React from 'react'
import { useLocation } from 'react-router'
import { useDispatch } from 'react-redux'
import { Dispatch } from 'redux'
import { Menu as Sidebar, MenuConfig, ReapitLogo } from '@reapit/elements'
import Routes from '@/constants/routes'
import { authLogout } from '@/actions/auth'
import { Location } from 'history'
import { FaCloud, FaSignOutAlt, FaSearch, FaList } from 'react-icons/fa'
import { ActionCreator } from '@/types/core'

export const generateMenuConfig = (logoutCallback: () => void, location: Location<any>): MenuConfig => {
  return {
    defaultActiveKey: 'CLIENT_SEARCH',
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

export type MenuProps = {}

export const logout = ({ dispatch, authLogout }: { dispatch: Dispatch; authLogout: ActionCreator<void> }) => () =>
  dispatch(authLogout())

export const Menu: React.FunctionComponent<MenuProps> = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const menuConfigs = generateMenuConfig(logout({ dispatch, authLogout }), location)
  return <Sidebar {...menuConfigs} location={location} />
}

export default Menu
