import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router'
import Routes from '../../constants/routes'
import { Icon, NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { memo } from 'react'
import { navigate } from '../../utils/navigation'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'

export const getDefaultNavIndex = (pathname: string) => {
  switch (pathname) {
    case Routes.APPROVALS:
      return 1
    case Routes.APPS:
      return 2
    case Routes.DEV_MANAGEMENT:
      return 3
    case Routes.INSTALLATIONS:
      return 4
    case Routes.BILLING:
      return 5
    case Routes.TRAFFIC:
      return 6
    case Routes.CUSTOMERS:
      return 7
    case Routes.SUBSCRIPTIONS:
      return 8
    case Routes.USAGE:
      return 9
    case Routes.IAAS:
      return 10
    case Routes.ROOT:
    default:
      return 0
  }
}

export const Menu: FC = () => {
  const location = useLocation()
  const { connectLogoutRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const history = useHistory()
  const { pathname } = location

  const navOptions = [
    {
      itemIndex: 0,
      callback: navigate(history, Routes.ROOT),
      icon: <Icon iconSize="medium" icon="reapitLogoMenu" />,
    },
    {
      itemIndex: 1,
      callback: navigate(history, Routes.APPROVALS),
      iconId: 'searchMenu',
      text: 'Approvals',
    },
    {
      itemIndex: 2,
      callback: navigate(history, Routes.APPS),
      iconId: 'appsMenu',
      text: 'Apps',
    },
    {
      itemIndex: 3,
      callback: navigate(history, Routes.DEV_MANAGEMENT),
      iconId: 'developersMenu',
      text: 'Developers',
    },
    {
      itemIndex: 4,
      callback: navigate(history, Routes.INSTALLATIONS),
      iconId: 'installedMenu',
      text: 'Installations',
    },
    {
      itemIndex: 5,
      callback: navigate(history, Routes.BILLING),
      iconId: 'paymentsMenu',
      text: 'Billing',
    },
    {
      itemIndex: 6,
      callback: navigate(history, Routes.TRAFFIC),
      iconId: 'mapMenu',
      text: 'Traffic',
    },
    {
      itemIndex: 7,
      callback: navigate(history, Routes.CUSTOMERS),
      iconId: 'usersMenu',
      text: 'Customers',
    },
    {
      itemIndex: 8,
      callback: navigate(history, Routes.SUBSCRIPTIONS),
      iconId: 'resultsMenu',
      text: 'Subs',
    },
    {
      itemIndex: 9,
      callback: navigate(history, Routes.USAGE),
      iconId: 'analyticsMenu',
      text: 'Usage',
    },
    {
      itemIndex: 10,
      callback: navigate(history, Routes.IAAS),
      iconId: 'dataMenu',
      text: 'IAAS',
    },
    {
      itemIndex: 11,
      callback: connectLogoutRedirect,
      isSecondary: true,
      iconId: 'logoutMenu',
      text: 'Logout',
    },
  ]

  return <NavResponsive defaultNavIndex={getDefaultNavIndex(pathname)} options={navOptions as NavResponsiveOption[]} />
}

export default memo(Menu)
