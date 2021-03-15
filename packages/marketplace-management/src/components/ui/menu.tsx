import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import {
  ProfileIcon,
  Menu as Sidebar,
  MenuConfig,
  ReapitHouseIcon,
  OfficesIcon,
  UsersIcon,
  MarketplaceIcon,
  AppsIcon,
} from '@reapit/elements'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { Location } from 'history'
import Routes from '../../constants/routes'
import { menuItemOverflow } from './__styles__'

export const callbackAppClick = () =>
  (window.location.href =
    window.location.href.includes('dev') || window.location.href.includes('localhost')
      ? 'https://marketplace.dev.paas.reapit.cloud/installed'
      : 'https://marketplace.reapit.cloud/installed')

export const generateMenuConfig = (
  logoutCallback: () => void,
  location: Location<any>,
  mode: Pick<MenuConfig, 'mode'>['mode'],
): any => {
  const config = {
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
        title: 'Offices',
        key: 'OFFICES',
        url: Routes.OFFICES,
        type: 'PRIMARY',
        icon: <OfficesIcon />,
      },
      {
        title: 'Users',
        key: 'USERS',
        url: Routes.USERS,
        type: 'PRIMARY',
        icon: <UsersIcon />,
      },
      {
        title: <div className={menuItemOverflow}>Marketplace</div>,
        key: 'MARKETPLACE',
        icon: <MarketplaceIcon />,
        url: Routes.MARKETPLACE,
        type: 'PRIMARY',
      },
    ],
  }
  if (mode === 'WEB') {
    return {
      ...config,
      menu: [
        ...config.menu,
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

  return config
}

export type MenuProps = RouteComponentProps

export const Menu: React.FunctionComponent<MenuProps> = ({ location }) => {
  const { connectLogoutRedirect, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const mode = connectIsDesktop ? 'DESKTOP' : 'WEB'
  const menuConfigs = generateMenuConfig(connectLogoutRedirect, location, mode) || {}
  return <Sidebar {...menuConfigs} location={location} />
}

export default withRouter(Menu)
