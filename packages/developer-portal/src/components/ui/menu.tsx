import * as React from 'react'
import { useHistory, useLocation } from 'react-router'
import Routes from '../../constants/routes'
import { Icon, NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { memo } from 'react'
import { navigate } from '../../utils/navigation'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import WeekOneXmas from '../../assets/images/xmas-logos/Week1.png'
import WeekTwoXmas from '../../assets/images/xmas-logos/Week2.png'
import WeekThreeXmas from '../../assets/images/xmas-logos/Week3.png'
import WeekFourXmas from '../../assets/images/xmas-logos/Week4.png'
import { styled } from '@linaria/react'
import { selectLoginIdentity } from '@/selector/auth'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

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

export const getDefaultNavIndex = (pathname: string) => {
  if (pathname.includes('/apps')) return 1
  switch (pathname) {
    case Routes.ANALYTICS:
    case Routes.ANALYTICS_COSTS:
    case Routes.ANALYTICS_API_CALLS:
    case Routes.ANALYTICS_INSTALLATIONS:
    case Routes.ANALYTICS_COST_CALCULATOR:
      return 2
    case Routes.SWAGGER:
    case Routes.WEBHOOKS_ABOUT:
    case Routes.WEBHOOKS_LOGS:
    case Routes.WEBHOOKS_MANAGE:
    case Routes.WEBHOOKS_NEW:
    case Routes.GRAPHQL:
    case Routes.DESKTOP:
      return 3
    case Routes.ELEMENTS:
      return 4
    case Routes.API_DOCS:
      return 5
    case Routes.IAAS:
      return 6
    case Routes.SETTINGS:
    case Routes.SETTINGS_COMPANY:
    case Routes.SETTINGS_MEMBERS:
    case Routes.SETTINGS_PASSWORD:
    case Routes.SETTINGS_PROFILE:
    case Routes.SETTINGS_SUBSCRIPTIONS:
      return 9
    default:
      return 0
  }
}

export const Menu: React.FunctionComponent = () => {
  const location = useLocation()
  const history = useHistory()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const loginIdentity = selectLoginIdentity(connectSession)

  if (location.pathname === Routes.INVITE) return null

  const navOptions: Array<NavResponsiveOption> = [
    {
      itemIndex: 0,
      callback: navigate(history, Routes.APPS),
      icon: <XmasLogo />,
    },
    {
      itemIndex: 1,
      callback: navigate(history, Routes.APPS),
      iconId: 'appsMenu',
      text: 'Apps',
    },
    {
      itemIndex: 2,
      callback: navigate(history, Routes.ANALYTICS_API_CALLS),
      iconId: 'analyticsMenu',
      text: 'Analytics',
    },
    {
      itemIndex: 3,
      callback: navigate(history, Routes.SWAGGER),
      iconId: 'apiMenu',
      text: 'API',
      subItems: [
        {
          itemIndex: 0,
          callback: navigate(history, Routes.SWAGGER),
          text: 'Foundations API',
        },
        {
          itemIndex: 1,
          callback: navigate(history, Routes.WEBHOOKS_ABOUT),
          iconId: 'webhooksMenu',
          text: 'Webhooks',
        },
        {
          itemIndex: 2,
          callback: navigate(history, Routes.GRAPHQL),
          text: 'GraphQL',
        },
      ],
    },
    {
      itemIndex: 4,
      callback: navigate(history, Routes.ELEMENTS),
      iconId: 'uiMenu',
      text: 'UI',
    },
    {
      itemIndex: 5,
      callback: navigate(history, Routes.API_DOCS),
      iconId: 'docsMenu',
      text: 'Docs',
      subItems: [
        {
          itemIndex: 3,
          callback: navigate(history, Routes.API_DOCS),
          text: 'APIs',
        },
        {
          itemIndex: 4,
          callback: navigate(history, Routes.ANALYTICS_SCHEMA_DOCS),
          text: 'Warehouse',
        },
      ],
    },
    {
      itemIndex: 6,
      callback: navigate(history, Routes.DESKTOP),
      iconId: 'desktopMenu',
      text: 'Desktop',
    },
    {
      itemIndex: 7,
      callback: () => (window.location.href = window.reapit.config.marketplaceUrl),
      iconId: 'marketplaceMenu',
      text: 'AppMarket',
    },
    {
      itemIndex: 9,
      callback: navigate(history, Routes.SETTINGS_PROFILE),
      iconId: 'myAccountMenu',
      text: 'Settings',
      isSecondary: true,
    },
  ]

  if (loginIdentity.developerId && window.reapit.config.pipelineWhitelist.includes(loginIdentity.developerId)) {
    navOptions.splice(6, 1, {
      itemIndex: 10,
      callback: navigate(history, Routes.IAAS),
      iconId: 'dataMenu',
      text: 'IaaS',
    })
  }

  return <NavResponsive defaultNavIndex={getDefaultNavIndex(location.pathname)} options={navOptions} />
}

export default memo(Menu)
