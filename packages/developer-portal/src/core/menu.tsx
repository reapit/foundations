import React, { FC, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import Routes from '../constants/routes'
import { ElChipLabel, Icon, NavResponsive, NavResponsiveAvatarOption, NavResponsiveOption } from '@reapit/elements'
import { memo } from 'react'
import { navigateRoute, openNewPage } from '../utils/navigation'
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
import { getAvatarInitials } from '@reapit/utils-react'
import { useGlobalState } from './use-global-state'
import { NavWithOrgPicker } from './__styles__/nav'
import { css } from '@linaria/core'

const XmasImage = styled.img`
  height: 2.5rem;
  width: 2.5rem;
`

const CurrentOrgNameStyled = styled(ElChipLabel)`
  margin-right: 0.5rem;
`

const CurrentOrgName = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const loginIdentity = selectLoginIdentity(connectSession)
  const b = connectSession?.idToken.split('.')?.[1]
  if (!b) {
    return null
  }

  try {
    const orgTypes = JSON.parse(JSON.parse(atob(b)).organisationTypes) as {
      id: string
      name: string
      types: ('customer' | 'developer' | 'organisation')[]
    }[]

    if (orgTypes.map((o) => o.types).flat().length === 1) {
      return null
    }
  } catch (e) {
    console.error(e)
    return null
  }

  return <CurrentOrgNameStyled>{loginIdentity?.orgName}</CurrentOrgNameStyled>
}

const ChooseableOrgType = css`
  cursor: pointer;

  &:hover {
    color: var(--intent-primary);
  }
`

const OrgPicker = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const b = connectSession?.idToken.split('.')?.[1]
  if (!b) {
    return null
  }

  const orgTypes = JSON.parse(JSON.parse(atob(b)).organisationTypes) as {
    id: string
    name: string
    types: ('customer' | 'developer' | 'organisation')[]
  }[]

  const switchOrg = (orgId: string, orgType?: string) => {
    reapitConnectBrowserSession.changeOrg(orgId, orgType)
  }

  return (
    <div
      style={{
        // padding: 8,
        paddingTop: 18,
        width: '100%',
      }}
    >
      <h4 style={{ paddingLeft: 12, fontWeight: 'bold', marginBottom: 8 }}>Switch Organisation</h4>
      <ul style={{ padding: 12 }}>
        {orgTypes.map((ot) => {
          const multiType = ot.types.length > 1
          return (
            <li
              className={multiType ? '' : ChooseableOrgType}
              style={{ marginBottom: 12 }}
              key={ot.id}
              onClick={() => {
                if (!multiType) {
                  switchOrg(ot.id, ot.types[0])
                }
              }}
            >
              {ot.name}
              {multiType ? (
                <ul style={{ marginTop: 8, borderLeft: '2px solid var(--color-purple-50)', paddingLeft: 8 }}>
                  {ot.types.map((t) => (
                    <li
                      className={ChooseableOrgType}
                      key={t}
                      style={{ textTransform: 'capitalize', marginBottom: 12 }}
                      onClick={() => {
                        switchOrg(ot.id, t)
                      }}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

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

  return <Icon icon="reapitLogo" />
}

export const getDefaultNavIndex = (pathname: string) => {
  if (pathname.includes('/apps')) return 1
  if (pathname.includes('/analytics/')) return 8
  if (pathname.includes('/webhooks')) return 13
  if (pathname.includes('/settings')) return 22

  switch (pathname) {
    case Routes.SWAGGER:
    case Routes.GRAPHQL:
    case Routes.DESKTOP:
      return 13
    case Routes.ELEMENTS:
      return 18
    case Routes.IAAS:
      return 19
    case Routes.API_DOCS:
    case Routes.ANALYTICS_SCHEMA_DOCS:
      return 20
    default:
      return 0
  }
}

export const Menu: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { connectSession, connectLogoutRedirect } = useReapitConnect(reapitConnectBrowserSession)
  const loginIdentity = selectLoginIdentity(connectSession)
  const { pathname } = location
  const appIdFromPath = pathname.includes('apps') ? pathname.split('/')[2] : ''
  const hasPipelines = loginIdentity?.developerId && process.env.pipelineWhitelist.includes(loginIdentity.developerId)
  const isCustomer = selectIsCustomer(connectSession)
  const appId = isUuid(appIdFromPath) ? appIdFromPath : null
  const { globalDataState } = useGlobalState()
  const { currentMember } = globalDataState

  if (pathname === Routes.INVITE) return null

  const navOptions = [
    {
      itemIndex: 0,
      callback: navigateRoute(navigate, Routes.APPS),
    },
    {
      itemIndex: 1,
      callback: navigateRoute(navigate, Routes.APPS),
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
      text: 'UI',
    },
    loginIdentity?.developerId &&
      process.env.pipelineWhitelist.includes(loginIdentity?.developerId) && {
        itemIndex: 19,
        callback: navigateRoute(navigate, Routes.IAAS),
        text: 'IaaS',
      },
    {
      itemIndex: 20,
      callback: navigateRoute(navigate, Routes.API_DOCS),
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
      text: <CurrentOrgName />,
    },
  ].filter(Boolean) as NavResponsiveOption[]

  return (
    <NavResponsive
      className={NavWithOrgPicker}
      defaultNavIndex={getDefaultNavIndex(pathname)}
      options={navOptions}
      appSwitcherOptions={[
        {
          text: 'AppMarket',
          callback: openNewPage(process.env.marketplaceUrl),
          iconUrl: <Icon icon="reapitLogoSmall" />,
        },
      ]}
      avatarText={getAvatarInitials(connectSession)}
      avatarOptions={
        [
          {
            text: <OrgPicker />,
          },
          {
            callback: navigateRoute(navigate, Routes.SETTINGS_PROFILE),
            text: 'Profile',
          },
          {
            callback: navigateRoute(navigate, Routes.SETTINGS_PASSWORD),
            text: 'Password',
          },
          currentMember?.role === 'admin' && {
            callback: navigateRoute(navigate, Routes.SETTINGS_MEMBERS),
            text: 'Members',
          },
          currentMember?.role === 'admin' && {
            callback: navigateRoute(navigate, Routes.SETTINGS_COMPANY),
            text: 'Company',
          },
          currentMember?.role === 'admin' && {
            callback: navigateRoute(navigate, Routes.SETTINGS_SUBSCRIPTIONS),
            text: 'Subscriptions',
          },
          {
            callback: connectLogoutRedirect,
            text: 'Logout',
          },
        ].filter(Boolean) as NavResponsiveAvatarOption[]
      }
    />
  )
}

export default memo(Menu)
