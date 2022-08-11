import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useLocation } from 'react-router'
import Routes from '@/constants/routes'
import { selectIsAdmin, selectSandboxDeveloper } from '@/selector/auth'
import { useReapitConnect } from '@reapit/connect-session'
import { history } from '../../core/router'
import { Icon, NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { navigate } from '../../utils/navigation'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import WeekOneXmas from '../../assets/images/xmas-logos/Week1.png'
import WeekTwoXmas from '../../assets/images/xmas-logos/Week2.png'
import WeekThreeXmas from '../../assets/images/xmas-logos/Week3.png'
import WeekFourXmas from '../../assets/images/xmas-logos/Week4.png'
import { styled } from '@linaria/react'

const XmasImage = styled.img`
  height: 2.5rem;
  width: 2.5rem;
`

dayjs.extend(isBetween)

export const XmasLogo: React.FC = () => {
  const now = dayjs()

  if (now.isBetween('2021-11-30', '2021-12-07', 'day')) {
    return <XmasImage src={WeekOneXmas} />
  }

  if (now.isBetween('2021-12-06', '2021-12-14', 'day')) {
    return <XmasImage src={WeekTwoXmas} />
  }

  if (now.isBetween('2021-12-13', '2021-12-21', 'day')) {
    return <XmasImage src={WeekThreeXmas} />
  }

  if (now.isBetween('2021-12-20', '2021-12-27', 'day')) {
    return <XmasImage src={WeekFourXmas} />
  }

  return <Icon iconSize="medium" icon="reapitLogoMenu" />
}

export interface MenuMappedActions {
  logout: () => void
}

export const getDefaultNavIndex = (pathname: string) => {
  switch (pathname) {
    case Routes.APPS:
    case Routes.APP_DETAIL:
      return 1
    case Routes.INSTALLED_APPS:
      return 2
    case Routes.MY_APPS:
    case Routes.MY_APPS_PAGINATE:
    case Routes.APP_DETAIL_MANAGE:
      return 3
    case Routes.SETTINGS:
      return 5
    default:
      return 0
  }
}

export const Menu: FC = () => {
  const location = useLocation()
  const { connectSession, connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const isDesktopAdmin = selectIsAdmin(connectSession)
  const isSandboxDeveloper = selectSandboxDeveloper(connectSession)
  const isAdmin = isDesktopAdmin || Boolean(isSandboxDeveloper)

  return (
    <NavResponsive
      defaultNavIndex={getDefaultNavIndex(location.pathname)}
      options={
        [
          {
            itemIndex: 0,
            callback: navigate(history, Routes.APPS),
            icon: <XmasLogo />,
          },
          {
            itemIndex: 1,
            callback: navigate(history, Routes.APPS),
            iconId: 'appsMenu',
            text: 'Browse',
          },
          {
            itemIndex: 2,
            callback: navigate(history, Routes.INSTALLED_APPS),
            iconId: 'installedMenu',
            text: 'Installed',
          },
          isAdmin && {
            itemIndex: 3,
            callback: navigate(history, Routes.MY_APPS),
            iconId: 'manageMenu',
            text: 'Manage',
          },
          isAdmin && !connectIsDesktop
            ? {
                itemIndex: 4,
                callback: () => (window.location.href = window.reapit.config.developerPortalUrl),
                iconId: 'developersMenu',
                text: 'Developers',
              }
            : null,
          {
            itemIndex: 5,
            callback: navigate(history, Routes.SETTINGS),
            iconId: 'myAccountMenu',
            text: 'Settings',
            isSecondary: true,
          },
        ].filter((item) => Boolean(item)) as NavResponsiveOption[]
      }
    />
  )
}

export default Menu
