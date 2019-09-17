import * as React from 'react'
import { withRouter, RouteComponentProps, RouteProps } from 'react-router'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Menu as Sidebar } from '@reapit/elements'
import Routes from '@/constants/routes'
import Logo from '@/components/svg/logo'
import { authLogout } from '@/actions/auth'

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

export const generateMenuConfig = ({ logout }: { logout: () => void }): MenuConfig => {
  return {
    title: 'Foundations',
    logo: <Logo width="150px" height="65px" />,
    homeUrl: '/',
    defaultActiveKey: Routes.HOME,
    menu: [
      {
        title: 'Background Checklist',
        key: 'Background Checklist',
        subMenu: [
          {
            title: 'Home',
            key: Routes.HOME,
            toUrl: Routes.HOME
          },
          {
            title: 'Client Search',
            key: Routes.SEARCH,
            toUrl: Routes.SEARCH
          },
          {
            title: 'Search Results',
            key: Routes.RESULTS,
            toUrl: Routes.RESULTS
          },
          {
            title: 'Logout',
            key: '/logout',
            callback: logout
          }
        ]
      }
    ]
  }
}

export type MenuProps = RouteComponentProps & {
  logout: () => void
}

export const Menu: React.FunctionComponent<MenuProps> = ({ location, logout }) => {
  const menuConfigs = generateMenuConfig({ logout })
  return <Sidebar {...menuConfigs} location={location} />
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logout: () => dispatch(authLogout())
  }
}

export const MenuWithRedux = connect(
  null,
  mapDispatchToProps
)(Menu)
MenuWithRedux.displayName = 'MenuWithRedux'

export const MenuWithRouter = withRouter(MenuWithRedux)
MenuWithRouter.displayName = 'MenuWithRouter'

export default MenuWithRouter
