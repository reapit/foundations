import * as React from 'react'
import { useLocation } from 'react-router'
import {
  ManageIcon,
  Menu as Sidebar,
  MenuConfig,
  AnalyticsIcon,
  AppsIcon,
  DevelopersIcon,
  PaymentsIcon,
  ReapitHouseIcon,
  ResultsIcon,
  UsersIcon,
  ProfileIcon,
} from '@reapit/elements'
import Routes from '../../constants/routes'
import { Location } from 'history'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

export const generateMenuConfig = (logoutCallback: () => void, location: Location<any>): MenuConfig => {
  return {
    defaultActiveKey: 'APPROVALS',
    location,
    menu: [
      {
        key: 'LOGO',
        icon: <ReapitHouseIcon />,
        type: 'LOGO',
      },
      {
        title: 'Approvals',
        key: 'APPROVALS',
        url: Routes.APPROVALS,
        icon: <ManageIcon />,
        type: 'PRIMARY',
      },
      {
        title: 'Apps',
        key: 'APPS',
        url: Routes.APPS,
        icon: <AppsIcon />,
        type: 'PRIMARY',
      },
      {
        title: 'Developers',
        key: 'DEV_MANAGEMENT',
        url: Routes.DEV_MANAGEMENT,
        icon: <DevelopersIcon />,
        type: 'PRIMARY',
      },
      {
        title: 'Stats',
        key: 'STATS',
        url: Routes.STATS,
        icon: <AnalyticsIcon />,
        type: 'PRIMARY',
      },
      {
        title: 'Billing',
        key: 'BILLINGS',
        url: Routes.BILLING,
        icon: <PaymentsIcon />,
        type: 'PRIMARY',
      },
      {
        title: 'Customers',
        key: 'CUSTOMERS',
        url: Routes.CUSTOMERS,
        icon: <UsersIcon />,
        type: 'PRIMARY',
      },
      {
        title: 'Subs',
        key: 'SUBSCRIPTIONS',
        url: Routes.SUBSCRIPTIONS,
        icon: <ResultsIcon />,
        type: 'PRIMARY',
      },
      {
        title: 'Logout',
        key: 'LOGOUT',
        callback: logoutCallback,
        icon: <ProfileIcon />,
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
