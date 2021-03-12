import * as React from 'react'
import { useLocation } from 'react-router'
import {
  AccountIcon,
  AnalyticsIcon,
  ApiIcon,
  AppsIcon,
  DesktopIcon,
  DocsIcon,
  HelpIcon,
  MarketplaceIcon,
  Menu as Sidebar,
  MenuConfig,
  ReapitLogo,
  WebhooksIcon,
} from '@reapit/elements'
import Routes from '../../constants/routes'
import { Location } from 'history'
import { menuItemOverflow } from './__styles__/menu'
import { history } from '../../core/router'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import WeekOneXmas from '../../assets/images/xmas-logos/Week1.png'
import WeekTwoXmas from '../../assets/images/xmas-logos/Week2.png'
import WeekThreeXmas from '../../assets/images/xmas-logos/Week3.png'
import WeekFourXmas from '../../assets/images/xmas-logos/Week4.png'

dayjs.extend(isBetween)

export const XmasLogo: React.FC = () => {
  const now = dayjs()
  const startDate = window.reapit.config.appEnv === 'production' ? '2020-11-30' : '2020-11-29'

  if (now.isBetween(startDate, '2020-12-07', 'day')) {
    return <img src={WeekOneXmas} />
  }

  if (now.isBetween('2020-12-06', '2020-12-14', 'day')) {
    return <img src={WeekTwoXmas} />
  }

  if (now.isBetween('2020-12-13', '2020-12-21', 'day')) {
    return <img src={WeekThreeXmas} />
  }

  if (now.isBetween('2020-12-20', '2020-12-27', 'day')) {
    return <img src={WeekFourXmas} />
  }

  return <ReapitLogo className="nav-item-icon" />
}

export const generateMenuConfig = (location: Location<any>): MenuConfig => {
  return {
    defaultActiveKey: 'MANAGE_APPS',
    location,
    menu: [
      {
        key: 'LOGO',
        icon: <ReapitLogo className="nav-item-icon" />,
        type: 'LOGO',
        callback: () => history.push(Routes.APPS),
      },
      {
        title: 'Apps',
        key: 'MANAGE_APPS',
        url: Routes.APPS,
        type: 'PRIMARY',
        icon: <AppsIcon />,
      },
      {
        title: 'Analytics',
        key: 'ANALYTICS',
        url: Routes.ANALYTICS,
        type: 'PRIMARY',
        icon: <AnalyticsIcon />,
      },
      {
        title: 'API',
        key: 'SWAGGER',
        url: Routes.SWAGGER,
        type: 'PRIMARY',
        icon: <ApiIcon />,
      },
      {
        title: 'Webhooks',
        key: 'WEBHOOKS',
        url: Routes.WEBHOOKS,
        type: 'PRIMARY',
        icon: <WebhooksIcon />,
      },
      {
        title: 'Docs',
        key: 'API_DOCS',
        url: Routes.API_DOCS,
        type: 'PRIMARY',
        icon: <DocsIcon />,
      },
      {
        title: 'Desktop',
        key: 'DESKTOP',
        url: Routes.DESKTOP,
        type: 'PRIMARY',
        icon: <DesktopIcon />,
      },
      {
        title: <div className={menuItemOverflow}>Marketplace</div>,
        key: 'MARKETPLACE',
        icon: <MarketplaceIcon />,
        callback: () => (window.location.href = window.reapit.config.marketplaceUrl),
        type: 'PRIMARY',
      },
      {
        title: 'Help',
        key: 'HELP',
        url: Routes.HELP,
        type: 'PRIMARY',
        icon: <HelpIcon />,
      },
      {
        title: 'Settings',
        key: 'SETTINGS',
        url: Routes.SETTINGS_PROFILE_TAB,
        icon: <AccountIcon />,
        type: 'SECONDARY',
      },
    ],
  }
}

export type MenuProps = {}

export const Menu: React.FunctionComponent<MenuProps> = () => {
  const location = useLocation()
  const menuConfigs = generateMenuConfig(location)
  if (location.pathname === Routes.INVITE) return null
  return <Sidebar {...menuConfigs} location={location} />
}

export default Menu
