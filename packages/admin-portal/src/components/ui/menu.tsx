import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { Menu as Sidebar, MenuConfig, ReapitLogo } from '@reapit/elements'
import { authLogout } from '@/actions/auth'
import Routes from '../../constants/routes'
import { Location } from 'history'
import { FaCheck, FaSignOutAlt, FaClipboardList, FaPortrait, FaTable, FaFileInvoice } from 'react-icons/fa'
import { selectLoginType } from '@/selector/auth'
import { ActionCreator } from '@/types/core'
import { LoginType } from '@reapit/cognito-auth'
import { Dispatch } from 'redux'

export const generateMenuConfig = (
  logoutCallback: () => void,
  location: Location<any>,
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
          url: Routes.APPS,
          icon: <FaClipboardList className="nav-item-icon" />,
          type: 'PRIMARY',
        },
        {
          title: 'Developers',
          key: 'DEV_MANAGEMENT',
          url: Routes.DEV_MANAGEMENT,
          icon: <FaPortrait className="nav-item-icon" />,
          type: 'PRIMARY',
        },
        {
          title: 'Stats',
          key: 'STATS',
          url: Routes.STATS,
          icon: <FaTable className="nav-item-icon" />,
          type: 'PRIMARY',
        },
        {
          title: 'Billing',
          key: 'BILLINGS',
          url: Routes.BILLING,
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
  const loginType = useSelector(selectLoginType)

  const menuConfigs = generateMenuConfig(logout({ dispatch, authLogout }), location)
  return <Sidebar {...menuConfigs[loginType]} location={location} />
}

export default Menu
