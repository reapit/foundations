import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps, RouteProps } from 'react-router'
import { Menu as Sidebar } from '@reapit/elements'
import { authLogout } from '../../actions/auth'
import Logo from '../svg/logo'

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
    title: 'Geo-diary',
    logo: <Logo width="150px" height="65px" />,
    homeUrl: '/',
    menu: [
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
  } as MenuConfig
}

export interface MenuMappedActions {
  logout: () => void
}

export type MenuProps = MenuMappedActions & RouteComponentProps & {}

export const Menu: React.FunctionComponent<MenuProps> = ({ logout, location }) => {
  const logoutCallback = () => logout()
  const menuConfigs = generateMenuConfig(logoutCallback)
  return <Sidebar {...menuConfigs} location={location} />
}

export const mapDispatchToProps = (dispatch: any): MenuMappedActions => ({
  logout: () => dispatch(authLogout())
})

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Menu)
)
