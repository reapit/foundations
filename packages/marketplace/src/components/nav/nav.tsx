import React, { FC } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { Icon, NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { Routes } from '../../constants/routes'
import { history } from '../../core/router'
import { navigate, navigateExternal } from '../../utils/navigation'
// Commenting out after Christmas
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import WeekOneXmas from '../../assets/images/xmas-logos/Week1.png'
import WeekTwoXmas from '../../assets/images/xmas-logos/Week2.png'
import WeekThreeXmas from '../../assets/images/xmas-logos/Week3.png'
import WeekFourXmas from '../../assets/images/xmas-logos/Week4.png'
import { styled } from '@linaria/react'

export const getDefaultNavIndex = (pathname: string) => {
  if (pathname.includes('apps')) return 1

  switch (pathname) {
    case Routes.HOME:
      return 1
    case Routes.APPS_INSTALLED:
      return 2
    case Routes.SUPPORT:
      return 4
    case Routes.SETTINGS_PROFILE:
    case Routes.SETTINGS_INSTALLED:
      return 5
    default:
      return 0
  }
}

const XmasImage = styled.img`
  height: 2.5rem;
  width: 2.5rem;
`

dayjs.extend(isBetween)

export const XmasLogo: React.FC = () => {
  const now = dayjs()

  if (now.isBetween('2022-12-04', '2022-12-12', 'day')) {
    return <XmasImage src={WeekOneXmas} />
  }

  if (now.isBetween('2022-12-11', '2022-12-19', 'day')) {
    return <XmasImage src={WeekTwoXmas} />
  }

  if (now.isBetween('2022-12-18', '2022-12-26', 'day')) {
    return <XmasImage src={WeekThreeXmas} />
  }

  if (now.isBetween('2022-12-25', '2023-01-01', 'day')) {
    return <XmasImage src={WeekFourXmas} />
  }

  return <Icon iconSize="medium" icon="reapitLogoMenu" />
}

export const Nav: FC = () => {
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)
  const navOptions: NavResponsiveOption[] = [
    {
      itemIndex: 0,
      callback: navigate(history, Routes.HOME),
      icon: <XmasLogo />,
    },
    {
      itemIndex: 1,
      text: 'Browse Apps',
      iconId: 'appsMenu',
      callback: navigate(history, Routes.APPS_BROWSE),
    },
    {
      itemIndex: 2,
      text: 'My Apps',
      iconId: 'installedMenu',
      callback: navigate(history, Routes.APPS_INSTALLED),
    },
    {
      itemIndex: 4,
      text: 'Support',
      iconId: 'supportMenu',
      isSecondary: true,
      callback: navigate(history, Routes.SUPPORT),
    },
    {
      itemIndex: 5,
      text: 'Settings',
      iconId: 'profileMenu',
      callback: navigate(history, Routes.SETTINGS_PROFILE),
      subItems: [
        {
          itemIndex: 1,
          callback: navigate(history, Routes.SETTINGS_PROFILE),
          text: 'Profile',
        },
        {
          itemIndex: 2,
          callback: navigate(history, Routes.SETTINGS_INSTALLED),
          text: 'Installed',
        },
      ],
    },
  ]

  if (!connectIsDesktop) {
    navOptions.splice(3, 0, {
      itemIndex: 3,
      callback: navigateExternal(window.reapit.config.developerPortalUrl),
      iconId: 'developersMenu',
      text: 'Developers',
    })
  }

  return <NavResponsive options={navOptions} defaultNavIndex={getDefaultNavIndex(window.location.pathname)} />
}

export default Nav
