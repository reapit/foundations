import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { ReapitLogo, Menu as Sidebar } from '@reapit/elements'
import { Location } from 'history'
import { FaSignOutAlt, FaCloud } from 'react-icons/fa'
import { LoginMode } from '@reapit/cognito-auth'
import { AuthContext } from '../../context'
import { ReapitConnectBrowserSessionInstance } from '../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'

require('react-dom')
;(window as any).React2 = require('react')
;(window as any).a2 = React.useState

export const generateMenuConfig = (logoutCallback: () => void, location: Location<any>, mode: LoginMode): any => {
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
      ? 'https://dev.marketplace.reapit.cloud/client/installed'
      : 'https://marketplace.reapit.cloud/client/installed')

export type MenuProps = RouteComponentProps

export const Menu: React.FunctionComponent<MenuProps> = ({ location }) => {
  // FIXME
  /**
   *   const { connectLogoutRedirect } = useReapitConnect(reapitConnectBrowserSession)
      should logout able
   */

  // TODO: move logout, logout should ok
  const { logout, loginSession } = React.useContext(AuthContext)
  const { connectLogoutRedirect } = useReapitConnect(ReapitConnectBrowserSessionInstance.instance)

  // TODO: in reapit connect
  const mode = loginSession?.mode || 'WEB'

  const menuConfigs = generateMenuConfig(connectLogoutRedirect, location, mode) || {}

  return <Sidebar {...menuConfigs} location={location} />
}

export default withRouter(Menu)
