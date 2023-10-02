import React, { FC } from 'react'
import { useNavigate, useLocation } from 'react-router'
import Routes from '../constants/routes'
import { Icon, NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { memo } from 'react'
import { navigateRoute } from '../utils/navigation'
// Comment out after Christmas
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import WeekOneXmas from '../assets/images/xmas-logos/Week1.png'
import WeekTwoXmas from '../assets/images/xmas-logos/Week2.png'
import WeekThreeXmas from '../assets/images/xmas-logos/Week3.png'
import WeekFourXmas from '../assets/images/xmas-logos/Week4.png'
import { styled } from '@linaria/react'
import { selectIsCustomer, selectLoginIdentity } from '../utils/auth'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from './connect-session'
import { validate as isUuid } from 'uuid'

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

export const getDefaultNavIndex = (pathname: string) => {
  if (pathname.includes('/apps')) return 1
  if (pathname.includes('/analytics/')) return 2
  if (pathname.includes('/webhooks')) return 3
  if (pathname.includes('/settings')) return 8

  switch (pathname) {
    case Routes.SWAGGER:
    case Routes.GRAPHQL:
    case Routes.DESKTOP:
      return 3
    case Routes.ELEMENTS:
      return 4
    case Routes.IAAS:
      return 5
    case Routes.API_DOCS:
    case Routes.ANALYTICS_SCHEMA_DOCS:
      return 6
    default:
      return 0
  }
}

export const Menu: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const loginIdentity = selectLoginIdentity(connectSession)
  const { pathname } = location
  const appIdFromPath = pathname.includes('apps') ? pathname.split('/')[2] : ''
  const hasPipelines = loginIdentity?.developerId && process.env.pipelineWhitelist.includes(loginIdentity.developerId)
  const isCustomer = selectIsCustomer(connectSession)
  const appId = isUuid(appIdFromPath) ? appIdFromPath : null

  if (pathname === Routes.INVITE) return null

  const navOptions = [
    {
      itemIndex: 0,
      callback: navigateRoute(navigate, Routes.APPS),
      icon: <XmasLogo />,
    },
    {
      itemIndex: 1,
      callback: navigateRoute(navigate, Routes.APPS),
      iconId: 'appsMenu',
      text: 'Apps',
      subItems: [
        {
          itemIndex: 2,
          callback: navigateRoute(navigate, Routes.APPS),
          text: 'My Apps',
        },
        appId && {
          itemIndex: 3,
          callback: navigateRoute(navigate, `${Routes.APPS}/${appId}`),
          text: 'App Details',
        },
        appId && {
          itemIndex: 4,
          callback: navigateRoute(navigate, `${Routes.APPS}/${appId}/edit/general`),
          text: 'Edit App',
        },
        appId && {
          itemIndex: 5,
          callback: navigateRoute(navigate, `${Routes.APPS}/${appId}/installations`),
          text: 'Installations',
        },
        appId &&
          hasPipelines && {
            itemIndex: 6,
            callback: navigateRoute(navigate, `${Routes.APPS}/${appId}/pipeline`),
            text: 'Pipeline',
          },
        {
          itemIndex: 7,
          callback: navigateRoute(navigate, Routes.APPS_NEW),
          text: 'New App',
        },
      ].filter(Boolean),
    },
    {
      itemIndex: 8,
      callback: navigateRoute(navigate, Routes.ANALYTICS_API_CALLS),
      iconId: 'analyticsMenu',
      text: 'Analytics',
      subItems: [
        {
          itemIndex: 9,
          callback: navigateRoute(navigate, Routes.ANALYTICS_API_CALLS),
          text: 'API Usage',
        },
        {
          itemIndex: 10,
          callback: navigateRoute(navigate, Routes.ANALYTICS_COSTS),
          text: 'Costs',
        },
        {
          itemIndex: 11,
          callback: navigateRoute(navigate, Routes.ANALYTICS_INSTALLATIONS),
          text: 'Installations',
        },
        isCustomer && {
          itemIndex: 12,
          callback: navigateRoute(navigate, Routes.ANALYTICS_COST_CALCULATOR),
          text: 'Cost Calculator',
        },
      ].filter(Boolean),
    },
    {
      itemIndex: 13,
      callback: navigateRoute(navigate, Routes.SWAGGER),
      iconId: 'apiMenu',
      text: 'API',
      subItems: [
        {
          itemIndex: 14,
          callback: navigateRoute(navigate, Routes.SWAGGER),
          text: 'Foundations API',
        },
        {
          itemIndex: 15,
          callback: navigateRoute(navigate, Routes.WEBHOOKS_ABOUT),
          text: 'Webhooks',
        },
        {
          itemIndex: 16,
          callback: navigateRoute(navigate, Routes.GRAPHQL),
          text: 'GraphQL',
        },
        {
          itemIndex: 17,
          callback: navigateRoute(navigate, Routes.DESKTOP),
          text: 'Desktop',
        },
      ],
    },
    {
      itemIndex: 18,
      callback: navigateRoute(navigate, Routes.ELEMENTS),
      iconId: 'uiMenu',
      text: 'UI',
    },
    loginIdentity?.developerId &&
      process.env.pipelineWhitelist.includes(loginIdentity?.developerId) && {
        itemIndex: 19,
        callback: navigateRoute(navigate, Routes.IAAS),
        iconId: 'dataMenu',
        text: 'IaaS',
      },
    {
      itemIndex: 20,
      callback: navigateRoute(navigate, Routes.API_DOCS),
      iconId: 'docsMenu',
      text: 'Docs',
      subItems: [
        {
          itemIndex: 21,
          callback: navigateRoute(navigate, Routes.API_DOCS),
          text: 'APIs',
        },
        {
          itemIndex: 22,
          callback: navigateRoute(navigate, Routes.ANALYTICS_SCHEMA_DOCS),
          text: 'Warehouse',
        },
      ],
    },
    {
      itemIndex: 23,
      callback: () => (window.location.href = process.env.marketplaceUrl),
      iconId: 'marketplaceMenu',
      text: 'AppMarket',
    },
    {
      itemIndex: 24,
      callback: navigateRoute(navigate, Routes.SETTINGS_PROFILE),
      iconId: 'myAccountMenu',
      isSecondary: true,
      text: 'Settings',
      subItems: [
        {
          itemIndex: 25,
          callback: navigateRoute(navigate, Routes.SETTINGS_PROFILE),
          text: 'Profile',
        },
        {
          itemIndex: 26,
          callback: navigateRoute(navigate, Routes.SETTINGS_PASSWORD),
          text: 'Password',
        },
        {
          itemIndex: 27,
          callback: navigateRoute(navigate, Routes.SETTINGS_MEMBERS),
          text: 'Members',
        },
        {
          itemIndex: 28,
          callback: navigateRoute(navigate, Routes.SETTINGS_COMPANY),
          text: 'Company',
        },
        {
          itemIndex: 29,
          callback: navigateRoute(navigate, Routes.SETTINGS_SUBSCRIPTIONS),
          text: 'Subscriptions',
        },
      ],
    },
  ].filter(Boolean) as NavResponsiveOption[]

  return <NavResponsive defaultNavIndex={getDefaultNavIndex(pathname)} options={navOptions} />
}

export default memo(Menu)
