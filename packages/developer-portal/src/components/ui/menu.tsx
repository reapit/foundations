import * as React from 'react'
import { useHistory, useLocation } from 'react-router'
import Routes from '../../constants/routes'
import { NavResponsive } from '@reapit/elements'
import { memo } from 'react'
import { navigate } from '../../utils/navigation'

/** Commenting out the Chrismas code for now. We may well use it again next year but no need for it
 * to be in the prod bundle */
// import { ReapitHouseIcon } from '@reapit/elements-legacy'
// import dayjs from 'dayjs'
// import isBetween from 'dayjs/plugin/isBetween'
// import WeekOneXmas from '../../assets/images/xmas-logos/Week1.png'
// import WeekTwoXmas from '../../assets/images/xmas-logos/Week2.png'
// import WeekThreeXmas from '../../assets/images/xmas-logos/Week3.png'
// import WeekFourXmas from '../../assets/images/xmas-logos/Week4.png'

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
    case Routes.WEBHOOKS:
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
              callback: navigate(history, Routes.WEBHOOKS),
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
              text: 'Docs',
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
          text: 'Marketplace',
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
