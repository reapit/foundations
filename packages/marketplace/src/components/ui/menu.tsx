import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { Menu as Sidebar, MenuConfig, ReapitLogo } from '@reapit/elements'
import { authLogout } from '@/actions/auth'
import Routes from '../../constants/routes'
import { Location } from 'history'
import { FaCloud, FaCloudDownloadAlt, FaCog, FaClipboardList } from 'react-icons/fa'
import { MdHelp } from 'react-icons/md'
import { selectIsAdmin, selectLoginType } from '@/selector/auth'
import { ActionCreator } from '@/types/core'
import { LoginType } from '@reapit/cognito-auth'
import { Dispatch } from 'redux'
import { selectDeveloperEditionId } from '@/selector/client'

export const generateMenuConfig = (
  logoutCallback: () => void,
  location: Location<any>,
  isAdmin: boolean,
): { [key: string]: MenuConfig } => {
  return {
    CLIENT: {
      defaultActiveKey: 'BROWSE_APPS',
      location,
      menu: [
        {
          key: 'LOGO',
          icon: <ReapitLogo className="nav-item-icon" />,
          type: 'LOGO',
        },
        {
          title: 'Browse',
          key: 'BROWSE_APPS',
          url: Routes.APPS,
          type: 'PRIMARY',
          icon: <FaCloud className="nav-item-icon" />,
        },
        {
          title: 'Installed',
          key: 'INSTALLED',
          url: Routes.INSTALLED_APPS,
          type: 'PRIMARY',
          icon: <FaCloudDownloadAlt className="nav-item-icon" />,
        },
        {
          title: 'Manage',
          key: 'MY_APPS',
          url: Routes.MY_APPS,
          type: 'PRIMARY',
          icon: <FaClipboardList className="nav-item-icon" />,
          disabled: !isAdmin,
        },
        {
          title: 'Help',
          key: 'HELP',
          url: Routes.HELP,
          type: 'PRIMARY',
          icon: <MdHelp className="nav-item-icon" />,
        },
        {
          title: 'Settings',
          key: 'SETTINGS',
          url: Routes.SETTINGS,
          icon: <FaCog className="nav-item-icon" />,
          type: 'SECONDARY',
        },
      ],
    },
  }
}

export interface MenuMappedProps {
  loginType: LoginType
  isAdmin: boolean
}

export interface MenuMappedActions {
  logout: () => void
}

export type MenuProps = {}

export const logout = ({ dispatch, authLogout }: { dispatch: Dispatch; authLogout: ActionCreator<void> }) => () =>
  dispatch(authLogout())

export const Menu: React.FunctionComponent<MenuProps> = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  // FIXME(menu) REMOVE
  const isDesktopAdmin = useSelector(selectIsAdmin)
  const isDeveloperEdition = Boolean(useSelector(selectDeveloperEditionId))
  // FIXME(menu) select from hooks session
  const loginType = useSelector(selectLoginType)

  // FIXME(menu) desk edition only
  const isAdmin = isDesktopAdmin || isDeveloperEdition

  // TESTME(menu): logout
  const menuConfigs = generateMenuConfig(logout({ dispatch, authLogout }), location, isAdmin)
  const menuConfig = menuConfigs[loginType]

  // invalid login type. E.g. admin view marketplace apps
  if (!menuConfig) {
    return null
  }

  return <Sidebar {...menuConfigs[loginType]} location={location} />
}

export default Menu
