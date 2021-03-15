import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import {
  Menu as Sidebar,
  MenuConfig,
  ReapitHouseIcon,
  AppsIcon,
  ProfileIcon,
  UsersIcon,
  DataIcon,
  AnalyticsIcon,
  AccountIcon,
} from '@reapit/elements'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { Location } from 'history'
import Routes from '../../constants/routes'

export const generateMenuConfig = (
  logoutCallback: () => void,
  location: Location<any>,
  mode: Pick<MenuConfig, 'mode'>['mode'],
): any => {
  return {
    defaultActiveKey: 'LOGO',
    mode,
    location,
    menu: [
      {
        key: 'LOGO',
        icon: <ReapitHouseIcon />,
        type: 'LOGO',
      },
      {
        title: 'Account',
        key: 'SUBSCRIPTIONS',
        icon: <AccountIcon />,
        url: Routes.SUBSCRIPTIONS,
        type: 'PRIMARY',
      },
      {
        title: 'Users',
        key: 'ACCOUNTS',
        icon: <UsersIcon />,
        url: Routes.ACCOUNTS,
        type: 'PRIMARY',
      },
      {
        title: 'Data',
        key: 'DATA',
        icon: <DataIcon />,
        url: Routes.DATA,
        type: 'PRIMARY',
      },
      {
        title: 'Analytics',
        key: 'ANALYTICS',
        url: Routes.ANALYTICS,
        type: 'PRIMARY',
        icon: <AnalyticsIcon />,
      },
      {
        title: 'Apps',
        key: 'APPS',
        icon: <AppsIcon />,
        callback: callbackAppClick,
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

export const callbackAppClick = () =>
  (window.location.href =
    window.location.href.includes('dev') || window.location.href.includes('localhost')
      ? 'https://marketplace.dev.paas.reapit.cloud/installed'
      : 'https://marketplace.reapit.cloud/installed')

export type MenuProps = RouteComponentProps

export const Menu: React.FunctionComponent<MenuProps> = ({ location }) => {
  const { connectLogoutRedirect, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const mode = connectIsDesktop ? 'DESKTOP' : 'WEB'
  const menuConfigs = generateMenuConfig(connectLogoutRedirect, location, mode) || {}
  return <Sidebar {...menuConfigs} location={location} />
}

export default withRouter(Menu)
