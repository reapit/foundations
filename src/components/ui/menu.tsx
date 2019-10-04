import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Menu as Sidebar, LoginType, MenuConfig, LoginMode, ReapitLogo } from '@reapit/elements'
import { ReduxState } from '@/types/core'
import { authLogout } from '@/actions/auth'
import Routes from '../../constants/routes'
import { Location } from 'history'
import { FaCheck, FaSignOutAlt, FaCloud, FaReadme, FaCloudUploadAlt, FaCloudDownloadAlt } from 'react-icons/fa'
import { oc } from 'ts-optchain'

export const generateMenuConfig = (
  logoutCallback: () => void,
  location: Location<any>,
  mode: LoginMode
): { [key: string]: MenuConfig } => {
  return {
    ADMIN: {
      defaultActiveKey: 'APPROVALS',
      mode,
      location,
      menu: [
        {
          key: 'LOGO',
          icon: <ReapitLogo className="nav-item-icon" />,
          type: 'LOGO'
        },
        {
          title: 'Approvals',
          key: 'APPROVALS',
          url: Routes.ADMIN_APPROVALS,
          icon: <FaCheck className="nav-item-icon" />,
          type: 'PRIMARY'
        },
        {
          title: 'Logout',
          key: 'LOGOUT',
          callback: logoutCallback,
          icon: <FaSignOutAlt className="nav-item-icon" />,
          type: 'SECONDARY'
        }
      ]
    },
    DEVELOPER: {
      defaultActiveKey: 'MANAGE_APPS',
      mode,
      location,
      menu: [
        {
          key: 'LOGO',
          icon: <ReapitLogo className="nav-item-icon" />,
          type: 'LOGO'
        },
        {
          title: 'Manage Apps',
          key: 'MANAGE_APPS',
          url: Routes.DEVELOPER_MY_APPS,
          type: 'PRIMARY',
          icon: <FaCloud className="nav-item-icon" />
        },
        {
          title: 'API Documentation',
          key: 'API_DOCS',
          url: Routes.DEVELOPER_API_DOCS,
          type: 'PRIMARY',
          icon: <FaReadme className="nav-item-icon" />
        },
        {
          title: 'Submit Apps',
          key: 'SUBMIT_APP',
          url: Routes.SUBMIT_APP,
          type: 'PRIMARY',
          icon: <FaCloudUploadAlt className="nav-item-icon" />
        },
        {
          title: 'Logout',
          key: 'LOGOUT',
          callback: logoutCallback,
          icon: <FaSignOutAlt className="nav-item-icon" />,
          type: 'SECONDARY'
        }
      ]
    },
    CLIENT: {
      defaultActiveKey: 'BROWSE_APPS',
      mode,
      location,
      menu: [
        {
          key: 'LOGO',
          icon: <ReapitLogo className="nav-item-icon" />,
          type: 'LOGO'
        },
        {
          title: 'Browse',
          key: 'BROWSE_APPS',
          url: Routes.CLIENT,
          type: 'PRIMARY',
          icon: <FaCloud className="nav-item-icon" />
        },
        {
          title: 'Installed',
          key: 'MY_APPS',
          url: Routes.MY_APPS,
          type: 'PRIMARY',
          icon: <FaCloudDownloadAlt className="nav-item-icon" />
        },
        {
          title: 'Logout',
          key: 'LOGOUT',
          callback: logoutCallback,
          icon: <FaSignOutAlt className="nav-item-icon" />,
          type: 'SECONDARY'
        }
      ]
    }
  }
}

export interface MenuMappedProps {
  loginType: LoginType
  mode: LoginMode
}

export interface MenuMappedActions {
  logout: () => void
}

export type MenuProps = MenuMappedProps & MenuMappedActions & RouteComponentProps & {}

export const Menu: React.FunctionComponent<MenuProps> = ({ logout, loginType, location, mode }) => {
  const logoutCallback = () => logout()
  const menuConfigs = generateMenuConfig(logoutCallback, location, mode)
  return <Sidebar {...menuConfigs[loginType]} location={location} />
}

export const mapStateToProps = (state: ReduxState): MenuMappedProps => ({
  loginType: state.auth.loginType,
  mode: oc(state).auth.refreshSession.mode('WEB')
})

export const mapDispatchToProps = (dispatch: any): MenuMappedActions => ({
  logout: () => dispatch(authLogout())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Menu)
)
