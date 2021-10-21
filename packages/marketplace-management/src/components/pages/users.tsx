import React, { FC } from 'react'
import { useHistory, useLocation } from 'react-router'
import { Route } from 'react-router-dom'
import Routes from '../../constants/routes'
import UsersTab from '../ui/users/users-tab'
import UsersGroupsTab from '../ui/users/user-groups-tab'
import {
  FlexContainer,
  SecondaryNavContainer,
  Title,
  SecondaryNav,
  elMb9,
  SecondaryNavItem,
  Icon,
  elMb5,
  BodyText,
  PageContainer,
  elHFull,
  Button,
} from '@reapit/elements'
import { navigate } from '../ui/nav/nav'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GLOSSARY_USER_ROLES_URL } from '../../constants/api'
import { OrgIdSelect } from '../../utils/use-org-id'

export const UsersPage: FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const { connectIsDesktop } = useReapitConnect(reapitConnectBrowserSession)

  return (
    <FlexContainer isFlexAuto>
      <SecondaryNavContainer>
        <Title>Users</Title>
        <SecondaryNav className={elMb9}>
          <SecondaryNavItem onClick={navigate(history, Routes.USERS)} active={pathname === Routes.USERS}>
            Users
          </SecondaryNavItem>
          <SecondaryNavItem
            onClick={navigate(history, Routes.USERS_GROUPS)}
            active={pathname.includes(Routes.USERS_GROUPS)}
          >
            User Groups
          </SecondaryNavItem>
        </SecondaryNav>
        <Icon className={elMb5} icon="vendorInfographic" iconSize="large" />
        <BodyText hasGreyText>
          {pathname === Routes.USERS
            ? 'This list contains all ‘Users’ within your organisation. You can edit users to manage the groups an individual user belongs to. For more information on ‘User Groups’, please click below.'
            : 'This list contains all available member groups for your organisation. You can manage users associated to each group by selecting the dropown.'}
        </BodyText>
        {connectIsDesktop ? (
          <Button
            className={elMb5}
            onClick={() => (window.location.href = `agencycloud://process/webpage?url=${GLOSSARY_USER_ROLES_URL}`)}
          >
            Docs
          </Button>
        ) : (
          <Button className={elMb5} onClick={() => window.open(GLOSSARY_USER_ROLES_URL, '_blank')}>
            Docs
          </Button>
        )}
        <OrgIdSelect />
      </SecondaryNavContainer>
      <PageContainer className={elHFull}>
        <Route path={Routes.USERS} component={UsersTab} exact />
        <Route path={Routes.USERS_GROUPS} component={UsersGroupsTab} exact />
      </PageContainer>
    </FlexContainer>
  )
}

export default UsersPage
