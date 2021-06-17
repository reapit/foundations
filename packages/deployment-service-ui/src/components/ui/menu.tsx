import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import {
  Menu as Sidebar,
  MenuConfig,
  ReapitHouseIcon,
  AppsIcon,
  ProfileIcon,
  DataIcon,
  ManageIcon,
} from '@reapit/elements'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { Location } from 'history'
import Routes from '@/constants/routes'

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
        title: 'Api Keys',
        key: 'API_KEYS',
        icon: <ProfileIcon />,
        callback: callbackAppClick,
        url: Routes.API_KEYS,
        type: 'PRIMARY',
      },
      {
        title: 'Pipelines',
        key: 'PIPELINES',
        icon: <DataIcon />,
        callback: callbackAppClick,
        url: Routes.PIPELINES,
        type: 'PRIMARY',
      },
      {
        title: 'Releases',
        key: 'RELEASES',
        icon: <ManageIcon />,
        callback: callbackAppClick,
        url: Routes.RELEASES,
        type: 'PRIMARY',
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
