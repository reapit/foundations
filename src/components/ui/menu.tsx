import * as React from 'react'
import { withRouter, RouteComponentProps, RouteProps } from 'react-router'
import { Menu as Sidebar } from '@reapit/elements'
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
    homeUrl: '/home',
    defaultActiveKey: 'Apps',
    menu: []
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
