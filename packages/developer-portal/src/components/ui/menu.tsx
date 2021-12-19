import * as React from 'react'
import { useHistory, useLocation } from 'react-router'
import Routes from '../../constants/routes'
import { Icon, NavResponsive } from '@reapit/elements'
import { memo } from 'react'
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

export const getDefaultNavIndex = (pathname: string) => {
  switch (pathname) {
    case Routes.APPS:
    case Routes.APP_DETAIL:
    case Routes.APP_PREVIEW:
      return 1
    case Routes.ANALYTICS:
    case Routes.ANALYTICS_TAB:
      return 2
    case Routes.SWAGGER:
    case Routes.WEBHOOKS_ABOUT:
    case Routes.WEBHOOKS_LOGS:
    case Routes.WEBHOOKS_MANAGE:
    case Routes.WEBHOOKS_NEW:
    case Routes.GRAPHQL:
      return 3
    case Routes.ELEMENTS:
      return 4
    case Routes.API_DOCS:
      return 5
    case Routes.DESKTOP:
      return 6
    case Routes.HELP:
      return 8
    case Routes.SETTINGS:
    case Routes.SETTINGS_BILLING_TAB:
    case Routes.SETTINGS_ORGANISATION_TAB:
    case Routes.SETTINGS_PROFILE_TAB:
      return 9
    default:
      return 0
  }
}

export const Menu: React.FunctionComponent = () => {
  const location = useLocation()
  const history = useHistory()

  if (location.pathname === Routes.INVITE) return null
  return (
    <NavResponsive
      defaultNavIndex={getDefaultNavIndex(location.pathname)}
      options={[
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
          callback: navigate(history, Routes.ANALYTICS),
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
          itemIndex: 8,
          callback: navigate(history, Routes.HELP),
          iconId: 'helpMenu',
          text: 'Help',
        },
        {
          itemIndex: 9,
          callback: navigate(history, Routes.SETTINGS_PROFILE_TAB),
          iconId: 'myAccountMenu',
          text: 'Settings',
          isSecondary: true,
        },
      ]}
    />
  )
}

export default memo(Menu)
