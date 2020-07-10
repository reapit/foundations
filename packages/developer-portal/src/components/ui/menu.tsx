import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { Menu as Sidebar, MenuConfig, ReapitLogo } from '@reapit/elements'
import { authLogout } from '@/actions/auth'
import Routes from '../../constants/routes'
import { Location } from 'history'
import {
  FaCheck,
  FaSignOutAlt,
  FaCloud,
  FaReadme,
  FaCloudDownloadAlt,
  FaCog,
  FaClipboardList,
  FaPortrait,
  FaTable,
  FaChartBar,
  FaBolt,
  FaFileInvoice,
  FaDesktop,
} from 'react-icons/fa'
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
          title: 'Approvals',
          key: 'APPROVALS',
          url: Routes.ADMIN_APPROVALS,
          icon: <FaCheck className="nav-item-icon" />,
          type: 'PRIMARY',
        },
        {
          title: 'Apps',
          key: 'APPS',
          url: Routes.ADMIN_APPS,
          icon: <FaClipboardList className="nav-item-icon" />,
          type: 'PRIMARY',
        },
        {
          title: 'Developers',
          key: 'DEV_MANAGEMENT',
          url: Routes.ADMIN_DEV_MANAGEMENT,
          icon: <FaPortrait className="nav-item-icon" />,
          type: 'PRIMARY',
        },
        {
          title: 'Stats',
          key: 'STATS',
          url: Routes.ADMIN_STATS,
          icon: <FaTable className="nav-item-icon" />,
          type: 'PRIMARY',
        },
        {
          title: 'Billing',
          key: 'BILLINGS',
          url: Routes.ADMIN_BILLING,
          icon: <FaFileInvoice className="nav-item-icon" />,
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
          url: Routes.DEVELOPER_SWAGGER,
          type: 'PRIMARY',
          icon: <GoDatabase className="nav-item-icon" />,
        },
        {
          title: 'Webhooks',
          key: 'WEBHOOKS',
          url: Routes.DEVELOPER_WEBHOOKS,
          type: 'PRIMARY',
          icon: <FaBolt className="nav-item-icon" />,
        },
        {
          title: 'Docs',
          key: 'API_DOCS',
          url: Routes.DEVELOPER_API_DOCS,
          type: 'PRIMARY',
          icon: <FaReadme className="nav-item-icon" />,
        },
        {
          title: 'Desktop',
          key: 'DESKTOP',
          url: Routes.DEVELOPER_DESKTOP,
          type: 'PRIMARY',
          icon: <FaDesktop className="nav-item-icon" />,
        },
        {
          title: 'Help',
          key: 'HELP',
          url: Routes.DEVELOPER_HELP,
          type: 'PRIMARY',
          icon: <MdHelp className="nav-item-icon" />,
        },
        {
          title: 'Settings',
          key: 'SETTINGS',
          url: Routes.DEVELOPER_SETTINGS,
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
        {
          title: 'Browse',
          key: 'BROWSE_APPS',
          url: Routes.CLIENT,
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
          url: Routes.CLIENT_HELP,
          type: 'PRIMARY',
          icon: <MdHelp className="nav-item-icon" />,
        },
        {
          title: 'Settings',
          key: 'SETTINGS',
          url: Routes.CLIENT_SETTINGS,
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
  const isDesktopAdmin = useSelector(selectIsAdmin)
  const isDeveloperEdition = Boolean(useSelector(selectDeveloperEditionId))
  const loginType = useSelector(selectLoginType)
  const isAdmin = isDesktopAdmin || isDeveloperEdition

  const menuConfigs = generateMenuConfig(logout({ dispatch, authLogout }), location, isAdmin)
  return <Sidebar {...menuConfigs[loginType]} location={location} />
}

export default Menu
