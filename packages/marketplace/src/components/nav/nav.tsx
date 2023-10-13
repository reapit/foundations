import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { Icon, NavResponsive, NavResponsiveAvatarOption, NavResponsiveOption } from '@reapit/elements'
import { RoutePaths } from '../../constants/routes'
import { navigateExternal, navigateRoute } from '../../utils/navigation'
// Commenting out after Christmas
// import dayjs from 'dayjs'
// import isBetween from 'dayjs/plugin/isBetween'
// import WeekOneXmas from '../../assets/images/xmas-logos/Week1.png'
// import WeekTwoXmas from '../../assets/images/xmas-logos/Week2.png'
// import WeekThreeXmas from '../../assets/images/xmas-logos/Week3.png'
// import WeekFourXmas from '../../assets/images/xmas-logos/Week4.png'
// import { styled } from '@linaria/react'
import { useNavigate } from 'react-router'
import { getAvatarInitials } from '@reapit/utils-react'
import { selectIsAdmin } from '../../utils/auth'

export const getDefaultNavIndex = (pathname: string) => {
  if (pathname.includes('apps')) return 1

  switch (pathname) {
    case RoutePaths.HOME:
      return 1
    case RoutePaths.APPS_INSTALLED:
      return 2
    case RoutePaths.SUPPORT:
      return 4
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
  const { connectIsDesktop, connectSession, connectLogoutRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const navigate = useNavigate()
  const isAdmin = selectIsAdmin(connectSession)

  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
      callback: navigateRoute(navigate, RoutePaths.HOME),
    },
    {
      itemIndex: 1,
      text: 'Browse Apps',
      callback: navigateRoute(navigate, RoutePaths.APPS_BROWSE),
    },
    {
      itemIndex: 2,
      text: 'My Apps',
      callback: navigateRoute(navigate, RoutePaths.APPS_INSTALLED),
    },
    {
      itemIndex: 4,
      text: 'Support',
      callback: navigateRoute(navigate, RoutePaths.SUPPORT),
    },
  ]

  return (
    <NavResponsive
      options={navOptions}
      defaultNavIndex={getDefaultNavIndex(window.location.pathname)}
      appSwitcherOptions={
        !connectIsDesktop
          ? [
              {
                text: 'DevPortal',
                callback: navigateExternal(process.env.developerPortalUrl),
                iconUrl: <Icon icon="reapitLogoSmallInfographic" />,
              },
            ]
          : undefined
      }
      avatarText={getAvatarInitials(connectSession)}
      avatarOptions={
        !connectIsDesktop
          ? ([
              {
                callback: navigateRoute(navigate, RoutePaths.SETTINGS_PROFILE),
                text: 'Profile',
              },
              isAdmin && {
                callback: navigateRoute(navigate, RoutePaths.SETTINGS_INSTALLED),
                text: 'Installed',
              },
              {
                callback: connectLogoutRedirect,
                text: 'Logout',
              },
            ].filter(Boolean) as NavResponsiveAvatarOption[])
          : undefined
      }
    />
  )
}

export default Nav
