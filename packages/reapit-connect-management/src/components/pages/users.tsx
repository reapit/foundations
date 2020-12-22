import React from 'react'
import { useHistory, useLocation } from 'react-router'
import { H3, Section, Content, Tabs, TabConfig } from '@reapit/elements'
import { Route } from 'react-router-dom'
import Routes from '../../constants/routes'
import UsersTab from '../ui/users/usersTab'
import UsersGroupsTab from '../ui/users/usersGroupsTab'

const tabConfigs = ({ pathname, handleChangeTab }: any): TabConfig[] => [
  {
    tabIdentifier: Routes.USERS,
    displayText: 'Users',
    onTabClick: handleChangeTab,
    active: pathname === Routes.USERS,
  },
  {
    tabIdentifier: Routes.USERS_GROUPS,
    displayText: 'Groups',
    onTabClick: handleChangeTab,
    active: pathname === Routes.USERS_GROUPS,
  },
]

export const UsersPage: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const handleChangeTab = (url: string) => history.push(url)
  return (
    <>
      <Content>
        <H3 isHeadingSection>Manage Users</H3>
        <Section>
          <Tabs tabConfigs={tabConfigs({ pathname, handleChangeTab })} />
          <Route path={Routes.USERS} component={UsersTab} exact />
          <Route path={Routes.USERS_GROUPS} component={UsersGroupsTab} exact />
        </Section>
      </Content>
    </>
  )
}

export default UsersPage
