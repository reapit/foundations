import React, { FC } from 'react'
import { useNavigate, useLocation, Routes } from 'react-router'
import { Route } from 'react-router-dom'
import RoutePaths from '../../constants/routes'
import UsersTab from '../ui/users/users-tab'
import UsersGroupsTab from '../ui/users/user-groups-tab'
import {
  FlexContainer,
  SecondaryNavContainer,
  SecondaryNav,
  SecondaryNavItem,
  Icon,
  elMb5,
  BodyText,
  PageContainer,
  elHFull,
  Button,
} from '@reapit/elements'
import { navigateRoute } from '../ui/nav/nav'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GLOSSARY_USER_ROLES_URL } from '../../constants/api'
import { OrgIdSelect } from '../hocs/org-id-select'

export const handleDocs = (connectIsDesktop: Boolean) => () => {
  return connectIsDesktop
    ? (window.location.href = `agencycloud://process/webpage?url=${GLOSSARY_USER_ROLES_URL}`)
    : window.open(GLOSSARY_USER_ROLES_URL, '_blank')
}

export const UsersPage: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <SecondaryNav>
          <SecondaryNavItem onClick={navigateRoute(navigate, RoutePaths.USERS)} active={pathname === RoutePaths.USERS}>
            Users
          </SecondaryNavItem>
          <SecondaryNavItem
            onClick={navigateRoute(navigate, RoutePaths.USERS_GROUPS)}
            active={pathname.includes(RoutePaths.USERS_GROUPS)}
          >
            User Groups
          </SecondaryNavItem>
        </SecondaryNav>
        <Icon className={elMb5} icon="vendorInfographic" iconSize="large" />
        <BodyText hasGreyText>
          {pathname === RoutePaths.USERS
            ? 'This list contains all ‘Users’ within your organisation. You can edit users to manage the groups an individual user belongs to. For more information on ‘User Groups’, please click below.'
            : 'This list contains all available member groups for your organisation. You can manage users associated to each group by selecting the dropown.'}
        </BodyText>
        <Button className={elMb5} onClick={handleDocs(connectIsDesktop)}>
          Docs
        </Button>
        <OrgIdSelect />
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Routes>
          <Route index element={<UsersTab />} />
          <Route path={RoutePaths.USERS_GROUPS.replace('/users/', '')} element={<UsersGroupsTab />} />
        </Routes>
      </PageContainer>
    </FlexContainer>
  )
}

export default UsersPage
