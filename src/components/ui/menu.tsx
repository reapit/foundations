import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps, RouteProps } from 'react-router'
import { Menu as Sidebar, LoginType } from '@reapit/elements'
import { ReduxState } from '@/types/core'
import { authLogout } from '@/actions/auth'
import Logo from '@/components/svg/logo'
import Routes from '../../constants/routes'

interface MenuConfig extends RouteProps {
  title: string
  logo: React.ReactNode
  homeUrl: string
  defaultActiveKey?: string
  menu: MenuItem[]
}
interface MenuItem {
  title: string
  key: string
  callback?: () => void
  toUrl?: string
  subMenu?: MenuItem[]
}

export const generateMenuConfig = logoutCallback => {
  return {
    ADMIN: {
      title: 'Foundations',
      logo: <Logo width="150px" height="65px" />,
      homeUrl: '/home',
      defaultActiveKey: 'Apps',
      menu: [
        {
          title: 'Apps',
          key: 'Apps',
          subMenu: [
            {
              title: 'Approvals',
              key: Routes.ADMIN_APPROVALS,
              toUrl: Routes.ADMIN_APPROVALS
            }
          ]
        },
        {
          title: 'Account',
          key: 'Account',
          subMenu: [
            {
              title: 'Logout',
              key: '/logout',
              callback: logoutCallback
            }
          ]
        }
      ]
    },
    DEVELOPER: {
      title: 'Foundations',
      logo: <Logo width="150px" height="65px" />,
      homeUrl: '/home',
      defaultActiveKey: 'Apps',
      menu: [
        {
          title: 'Apps',
          key: 'Apps',
          subMenu: [
            {
              title: 'Manage Apps',
              key: Routes.DEVELOPER_MY_APPS,
              toUrl: Routes.DEVELOPER_MY_APPS
            },
            {
              title: 'API Documentation',
              key: Routes.DEVELOPER_API_DOCS,
              toUrl: Routes.DEVELOPER_API_DOCS
            },
            {
              title: 'Submit Apps',
              key: Routes.SUBMIT_APP,
              toUrl: Routes.SUBMIT_APP
            }
          ]
        },
        {
          title: 'Account',
          key: 'Account',
          subMenu: [
            {
              title: 'Logout',
              key: '/logout',
              callback: logoutCallback
            }
          ]
        }
      ]
    },
    CLIENT: {
      title: 'Foundations',
      logo: <Logo width="150px" height="65px" />,
      homeUrl: '/home',
      defaultActiveKey: 'Apps',
      menu: [
        {
          title: 'Apps',
          key: 'Apps',
          subMenu: [
            {
              title: 'Browse Apps',
              key: Routes.CLIENT,
              toUrl: Routes.CLIENT
            },
            {
              title: 'Installed Apps',
              key: Routes.MY_APPS,
              toUrl: Routes.MY_APPS
            }
          ]
        },
        {
          title: 'Account',
          key: 'Account',
          subMenu: [
            {
              title: 'Logout',
              key: '/logout',
              callback: logoutCallback
            }
          ]
        }
      ]
    }
  }
}

export interface MenuMappedProps {
  loginType: LoginType
}

export interface MenuMappedActions {
  logout: (loginType: LoginType) => void
}

export type MenuProps = MenuMappedProps & MenuMappedActions & RouteComponentProps & {}

export const Menu: React.FunctionComponent<MenuProps> = ({ logout, loginType, location }) => {
  const logoutCallback = () => logout(loginType)
  const menuConfigs = generateMenuConfig(logoutCallback)
  return <Sidebar {...menuConfigs[loginType]} location={location} />
}

export const mapStateToProps = (state: ReduxState): MenuMappedProps => ({
  loginType: state.auth.loginType
})

export const mapDispatchToProps = (dispatch: any): MenuMappedActions => ({
  logout: (loginType: LoginType) => dispatch(authLogout(loginType))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Menu)
)
