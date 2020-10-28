import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { ReapitLogo, Menu as Sidebar, MenuConfig } from '@reapit/elements'
import { FaSignOutAlt, FaCloud, FaDatabase } from 'react-icons/fa'
import { MdAccountBalance /*, MdSettings */ } from 'react-icons/md'
// import { GiHealthNormal } from 'react-icons/gi'
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
        icon: <ReapitLogo className="nav-item-icon" />,
        type: 'LOGO',
      },
      {
        title: 'Accounts',
        key: 'ACCOUNTS',
        icon: <MdAccountBalance className="nav-item-icon" />,
        url: Routes.ACCOUNTS,
        type: 'PRIMARY',
      },
      {
        title: 'Data',
        key: 'DATA',
        icon: <FaDatabase className="nav-item-icon" />,
        url: Routes.DATA,
        type: 'PRIMARY',
      },
      // {
      //   title: 'Health',
      //   key: 'HEALTH',
      //   icon: <GiHealthNormal className="nav-item-icon" />,
      //   url: Routes.HEALTH,
      //   type: 'PRIMARY',
      // },
      // {
      //   title: 'Settings',
      //   key: 'SETTINGS',
      //   icon: <MdSettings className="nav-item-icon" />,
      //   url: Routes.SETTINGS,
      //   type: 'PRIMARY',
      // },
      {
        title: 'Apps',
        key: 'APPS',
        icon: <FaCloud className="nav-item-icon" />,
        callback: callbackAppClick,
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
