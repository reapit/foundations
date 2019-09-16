import * as React from 'react'
import { withRouter, RouteComponentProps, RouteProps } from 'react-router'
import { Menu as Sidebar } from '@reapit/elements'
import Routes from '@/constants/routes'
import Logo from '@/components/svg/logo'

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

export const generateMenuConfig = (): MenuConfig => {
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
            callback: () => {
              console.log('logout callback')
            }
          }
        ]
      }
    ]
  }
}

export type MenuProps = RouteComponentProps & {}

export const Menu: React.FunctionComponent<MenuProps> = ({ location }) => {
  const menuConfigs = generateMenuConfig()
  return <Sidebar {...menuConfigs} location={location} />
}

export const MenuWithRouter = withRouter(Menu)
MenuWithRouter.displayName = 'MenuWithRouter'
export default MenuWithRouter
