import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { Menu as Sidebar, MenuConfig, ReapitLogo } from '@reapit/elements'
import { authLogout } from '@/actions/auth'
import Routes from '../../constants/routes'
import { Location } from 'history'
import { FaSignOutAlt, FaCloud, FaReadme, FaCog, FaChartBar, FaBolt, FaDesktop } from 'react-icons/fa'
import { MdHelp } from 'react-icons/md'
import { GoDatabase } from 'react-icons/go'
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
    ADMIN: {
      defaultActiveKey: 'APPROVALS',
      location,
      menu: [
        {
          key: 'LOGO',
          icon: <ReapitLogo className="nav-item-icon" />,
          type: 'LOGO',
        },

        {
          title: 'Logout',
          key: 'LOGOUT',
          callback: logoutCallback,
          icon: <FaSignOutAlt className="nav-item-icon" />,
          type: 'SECONDARY',
        },
      ],
    },
    DEVELOPER: {
      defaultActiveKey: 'MANAGE_APPS',
      location,
      menu: [
        {
          key: 'LOGO',
          icon: <ReapitLogo className="nav-item-icon" />,
          type: 'LOGO',
        },
        {
          title: 'Apps',
          key: 'MANAGE_APPS',
          url: Routes.APPS,
          type: 'PRIMARY',
          icon: <FaCloud className="nav-item-icon" />,
        },
        {
          title: 'Analytics',
          key: 'DEVELOPER_ANALYTICS',
          url: Routes.ANALYTICS,
          type: 'PRIMARY',
          icon: <FaChartBar className="nav-item-icon" />,
        },
        {
          title: 'API',
          key: 'SWAGGER',
          url: Routes.SWAGGER,
          type: 'PRIMARY',
          icon: <GoDatabase className="nav-item-icon" />,
        },
        {
          title: 'Webhooks',
          key: 'WEBHOOKS',
          url: Routes.WEBHOOKS,
          type: 'PRIMARY',
          icon: <FaBolt className="nav-item-icon" />,
        },
        {
          title: 'Docs',
          key: 'API_DOCS',
          url: Routes.API_DOCS,
          type: 'PRIMARY',
          icon: <FaReadme className="nav-item-icon" />,
        },
        {
          title: 'Desktop',
          key: 'DESKTOP',
          url: Routes.DESKTOP,
          type: 'PRIMARY',
          icon: <FaDesktop className="nav-item-icon" />,
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
    CLIENT: {
      defaultActiveKey: 'BROWSE_APPS',
      location,
      menu: [
        {
          key: 'LOGO',
          icon: <ReapitLogo className="nav-item-icon" />,
          type: 'LOGO',
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
  const isDesktopAdmin = useSelector(selectIsAdmin)
  const isDeveloperEdition = Boolean(useSelector(selectDeveloperEditionId))
  const loginType = useSelector(selectLoginType)
  const isAdmin = isDesktopAdmin || isDeveloperEdition

  const menuConfigs = generateMenuConfig(logout({ dispatch, authLogout }), location, isAdmin)
  return <Sidebar {...menuConfigs[loginType]} location={location} />
}

export default Menu
