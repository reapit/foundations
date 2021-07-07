import React, { FC } from 'react'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { useLocation } from 'react-router'
import Routes from '@/constants/routes'
import { selectIsAdmin, selectSandboxDeveloper } from '@/selector/auth'
import { useReapitConnect } from '@reapit/connect-session'
import { history } from '../../core/router'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { navigate } from '../../utils/navigation'

/** Commenting out the Chrismas code for now. We may well use it again next year but no need for it
 * to be in the prod bundle */
// import WeekOneXmas from '../../assets/images/xmas-logos/Week1.png'
// import WeekTwoXmas from '../../assets/images/xmas-logos/Week2.png'
// import WeekThreeXmas from '../../assets/images/xmas-logos/Week3.png'
// import WeekFourXmas from '../../assets/images/xmas-logos/Week4.png'
// import dayjs from 'dayjs'
// import isBetween from 'dayjs/plugin/isBetween'
// dayjs.extend(isBetween)
// export const XmasLogo: React.FC = () => {
//   const now = dayjs()
//   const startDate = window.reapit.config.appEnv === 'production' ? '2020-11-30' : '2020-11-29'

//   if (now.isBetween(startDate, '2020-12-07', 'day')) {
//     return <img src={WeekOneXmas} />
//   }

//   if (now.isBetween('2020-12-06', '2020-12-14', 'day')) {
//     return <img src={WeekTwoXmas} />
//   }

//   if (now.isBetween('2020-12-13', '2020-12-21', 'day')) {
//     return <img src={WeekThreeXmas} />
//   }

//   if (now.isBetween('2020-12-20', '2020-12-27', 'day')) {
//     return <img src={WeekFourXmas} />
//   }

//   return <ReapitHouseIcon />
// }

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
          {
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
