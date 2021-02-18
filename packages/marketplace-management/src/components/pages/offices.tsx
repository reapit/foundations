import React from 'react'
import { useHistory, useLocation } from 'react-router'
import { H3, Section, Tabs, TabConfig } from '@reapit/elements'
import { Route } from 'react-router-dom'
import Routes from '../../constants/routes'
import OfficesTab from '../ui/offices/offices-tab'
import OfficesGroupsTab from '../ui/offices/offices-groups-tab'

const tabConfigs = ({ pathname, handleChangeTab }: any): TabConfig[] => [
  {
    tabIdentifier: Routes.OFFICES,
    displayText: 'Offices',
    onTabClick: handleChangeTab,
    active: pathname === Routes.OFFICES,
  },
  {
    tabIdentifier: Routes.OFFICES_GROUPS,
    displayText: 'Groups',
    onTabClick: handleChangeTab,
    active: pathname === Routes.OFFICES_GROUPS,
  },
]

const OfficesPage: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { pathname } = location
  const handleChangeTab = (url: string) => history.push(url)
  return (
    <div>
      <H3 isHeadingSection>Manage Offices</H3>
      <Section>
        <Tabs tabConfigs={tabConfigs({ pathname, handleChangeTab })} />
      </Section>
      <Route path={Routes.OFFICES} component={OfficesTab} exact />
      <Route path={Routes.OFFICES_GROUPS} component={OfficesGroupsTab} exact />
    </div>
  )
}

export default OfficesPage
