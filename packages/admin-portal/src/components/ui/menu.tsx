import * as React from 'react'
import { useLocation } from 'react-router'
import { Menu as Sidebar, MenuConfig, ReapitLogo } from '@reapit/elements'
import Routes from '../../constants/routes'
import { Location } from 'history'
import { FaCheck, FaSignOutAlt, FaClipboardList, FaPortrait, FaTable, FaFileInvoice } from 'react-icons/fa'
import { BsFillPersonLinesFill, BsCardChecklist } from 'react-icons/bs'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export const generateMenuConfig = (logoutCallback: () => void, location: Location<any>): MenuConfig => {
  return {
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
        url: Routes.APPROVALS,
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
        title: 'Customers',
        key: 'CUSTOMERS',
        url: Routes.CUSTOMERS,
        icon: <BsFillPersonLinesFill className="nav-item-icon" />,
        type: 'PRIMARY',
      },
      {
        title: 'Subs',
        key: 'SUBSCRIPTIONS',
        url: Routes.SUBSCRIPTIONS,
        icon: <BsCardChecklist className="nav-item-icon" />,
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

export const Menu: React.FunctionComponent<MenuProps> = () => {
  const location = useLocation()
  const { connectLogoutRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const menuConfigs = generateMenuConfig(() => connectLogoutRedirect(), location)

  return <Sidebar {...menuConfigs} location={location} />
}

export default Menu
