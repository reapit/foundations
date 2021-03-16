import * as React from 'react'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useLocation } from 'react-router'
import {
  ProfileIcon,
  AppsIcon,
  DevelopersIcon,
  InstalledIcon,
  ManageIcon,
  Menu as Sidebar,
  MenuConfig,
  ReapitHouseIcon,
} from '@reapit/elements'
import Routes from '@/constants/routes'
import { Location } from 'history'
import { selectIsAdmin, selectClientId, selectSandboxDeveloper } from '@/selector/auth'
import { useReapitConnect } from '@reapit/connect-session'
import domvsLogo from '@/assets/images/Domvs.jpg'
import { menuItemOverflow } from './__styles__/menu'
import { history } from '../../core/router'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import WeekOneXmas from '../../assets/images/xmas-logos/Week1.png'
import WeekTwoXmas from '../../assets/images/xmas-logos/Week2.png'
import WeekThreeXmas from '../../assets/images/xmas-logos/Week3.png'
import WeekFourXmas from '../../assets/images/xmas-logos/Week4.png'

dayjs.extend(isBetween)

// This is a really naff hack to hardcode our first client logo into the menu. Remove when we have a
// logo upload and API
const SettingsIcon: React.FC<{ clientId: string }> = ({ clientId }) => {
  return clientId === 'DOM' ? <img src={domvsLogo} /> : clientId === 'RPT' ? <ReapitHouseIcon /> : <ProfileIcon />
}

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

  return <ReapitHouseIcon />
}

export const generateMenuConfig = (
  location: Location<any>,
  isAdmin: boolean,
  isDesktop: boolean,
  clientId: string,
): MenuConfig => {
  return {
    defaultActiveKey: 'BROWSE_APPS',
    location,
    menu: [
      {
        key: 'LOGO',
        icon: <ReapitHouseIcon />,
        type: 'LOGO',
        callback: () => history.push(Routes.APPS),
      },
      {
        title: 'Browse',
        key: 'BROWSE_APPS',
        url: Routes.APPS,
        type: 'PRIMARY',
        icon: <AppsIcon />,
      },
      {
        title: 'Installed',
        key: 'INSTALLED',
        url: Routes.INSTALLED_APPS,
        type: 'PRIMARY',
        icon: <InstalledIcon />,
      },
      {
        title: 'Manage',
        key: 'MY_APPS',
        url: Routes.MY_APPS,
        type: 'PRIMARY',
        icon: <ManageIcon />,
        disabled: !isAdmin,
      },
      {
        title: <div className={menuItemOverflow}>Developers</div>,
        key: 'DEVELOPERS',
        icon: <DevelopersIcon />,
        callback: () => (window.location.href = window.reapit.config.developerPortalUrl),
        type: 'PRIMARY',
        disabled: !isAdmin || isDesktop,
      },
      {
        title: 'Settings',
        key: 'SETTINGS',
        url: Routes.SETTINGS,
        icon: <SettingsIcon clientId={clientId} />,
        type: 'SECONDARY',
      },
    ],
  }
}

export interface MenuMappedActions {
  logout: () => void
}

export type MenuProps = {}

export const Menu: React.FunctionComponent<MenuProps> = () => {
  const location = useLocation()
  const { connectSession, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const isDesktopAdmin = selectIsAdmin(connectSession)
  const clientId = selectClientId(connectSession)

  const isSandboxDeveloper = selectSandboxDeveloper(connectSession)
  const isAdmin = isDesktopAdmin || Boolean(isSandboxDeveloper)

  const menuConfigs = generateMenuConfig(location, isAdmin, connectIsDesktop, clientId)

  return <Sidebar {...menuConfigs} location={location} />
}

export default Menu
