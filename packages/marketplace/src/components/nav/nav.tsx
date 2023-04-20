import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { Icon, NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { RoutePaths } from '../../constants/routes'
import { navigateRoute, navigateExternal } from '../../utils/navigation'
// Commenting out after Christmas
// import dayjs from 'dayjs'
// import isBetween from 'dayjs/plugin/isBetween'
// import WeekOneXmas from '../../assets/images/xmas-logos/Week1.png'
// import WeekTwoXmas from '../../assets/images/xmas-logos/Week2.png'
// import WeekThreeXmas from '../../assets/images/xmas-logos/Week3.png'
// import WeekFourXmas from '../../assets/images/xmas-logos/Week4.png'
// import { styled } from '@linaria/react'
import { useNavigate } from 'react-router'

export const getDefaultNavIndex = (pathname: string) => {
  if (pathname.includes('apps')) return 1

  switch (pathname) {
    case RoutePaths.HOME:
      return 1
    case RoutePaths.APPS_INSTALLED:
      return 2
    case RoutePaths.SUPPORT:
      return 4
    case RoutePaths.SETTINGS_PROFILE:
    case RoutePaths.SETTINGS_INSTALLED:
      return 5
    default:
      return 0
  }
}

// const XmasImage = styled.img`
//   height: 2.5rem;
//   width: 2.5rem;
// `

// dayjs.extend(isBetween)

// export const XmasLogo: React.FC = () => {
//   const now = dayjs()

//   if (now.isBetween('2022-12-04', '2022-12-12', 'day')) {
//     return <XmasImage src={WeekOneXmas} />
//   }

//   if (now.isBetween('2022-12-11', '2022-12-19', 'day')) {
//     return <XmasImage src={WeekTwoXmas} />
//   }

//   if (now.isBetween('2022-12-18', '2022-12-26', 'day')) {
//     return <XmasImage src={WeekThreeXmas} />
//   }

//   if (now.isBetween('2022-12-25', '2023-01-01', 'day')) {
//     return <XmasImage src={WeekFourXmas} />
//   }

//   return <Icon iconSize="medium" icon="reapitLogoMenu" />
// }

export const Nav: FC = () => {
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const navigate = useNavigate()
  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
      callback: navigateRoute(navigate, RoutePaths.HOME),
      icon: <Icon iconSize="medium" icon="reapitLogoMenu" />,
    },
    {
      itemIndex: 1,
      text: 'Browse Apps',
      iconId: 'appsMenu',
      callback: navigateRoute(navigate, RoutePaths.APPS_BROWSE),
    },
    {
      itemIndex: 2,
      text: 'My Apps',
      iconId: 'installedMenu',
      callback: navigateRoute(navigate, RoutePaths.APPS_INSTALLED),
    },
    {
      itemIndex: 4,
      text: 'Support',
      iconId: 'supportMenu',
      isSecondary: true,
      callback: navigateRoute(navigate, RoutePaths.SUPPORT),
    },
    {
      itemIndex: 5,
      text: 'Settings',
      iconId: 'profileMenu',
      callback: navigateRoute(navigate, RoutePaths.SETTINGS_PROFILE),
      subItems: [
        {
          itemIndex: 1,
          callback: navigateRoute(navigate, RoutePaths.SETTINGS_PROFILE),
          text: 'Profile',
        },
        {
          itemIndex: 2,
          callback: navigateRoute(navigate, RoutePaths.SETTINGS_INSTALLED),
          text: 'Installed',
        },
      ],
    },
  ]

  if (!connectIsDesktop) {
    navOptions.splice(3, 0, {
      itemIndex: 3,
      callback: navigateExternal(process.env.developerPortalUrl),
      iconId: 'developersMenu',
      text: 'Developers',
    })
  }

  return <NavResponsive options={navOptions} defaultNavIndex={getDefaultNavIndex(window.location.pathname)} />
}

export default Nav
