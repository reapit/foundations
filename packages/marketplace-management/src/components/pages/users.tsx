import React from 'react'
import { useHistory, useLocation } from 'react-router'
import { H3, Section, Tabs, TabConfig } from '@reapit/elements'
import { Route } from 'react-router-dom'
import Routes from '../../constants/routes'
import UsersTab from '../ui/users/users-tab'
import UsersGroupsTab from '../ui/users/user-groups-tab'

interface TabConfigsParams {
  pathname: string
  handleChangeTab: (url: string) => void
}

const tabConfigs = ({ pathname, handleChangeTab }: TabConfigsParams): TabConfig[] => [
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
    <div>
      <H3 isHeadingSection>Manage Users</H3>
      {window.reapit.config.appEnv !== 'production' && (
        <>
          <Section>
            <Tabs tabConfigs={tabConfigs({ pathname, handleChangeTab })} />
          </Section>
          <Route path={Routes.USERS} component={UsersTab} exact />
        </>
      )}
      <Route path={Routes.USERS_GROUPS} component={UsersGroupsTab} exact />
    </div>
  )
}

export default UsersPage
