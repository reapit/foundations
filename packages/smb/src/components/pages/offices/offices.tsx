import * as React from 'react'
import { H3, FlexContainerBasic, FlexContainerResponsive, TabConfig, Tabs } from '@reapit/elements'
import OfficesTab from '@/components/ui/offices-tab'
import AreasTab from '@/components/ui/areas-tab'
import GlobalSettingsTab from '@/components/ui/global-settings-tab'
import IntegrationsTab from '@/components/ui/integration-tab'

const tabConfigs = ({ tab, handleChangeTab }: any): TabConfig[] => [
  {
    tabIdentifier: 'offices',
    displayText: 'Offices',
    onTabClick: handleChangeTab,
    active: tab === 'offices',
  },
  {
    tabIdentifier: 'areas',
    displayText: 'Areas',
    onTabClick: handleChangeTab,
    active: tab === 'areas',
  },
  {
    tabIdentifier: 'globalSettings',
    displayText: 'Global Settings',
    onTabClick: handleChangeTab,
    active: tab === 'globalSettings',
  },
  {
    tabIdentifier: 'integrations',
    displayText: 'Integrations',
    onTabClick: handleChangeTab,
    active: tab === 'integrations',
  },
]

export type OfficesProps = {}

export const Offices: React.FC<OfficesProps> = () => {
  const [tab, handleChangeTab] = React.useState('offices')

  const currentTab = tabConfigs({}).find(tabObj => tabObj.tabIdentifier === tab)

  return (
    <FlexContainerBasic hasPadding hasBackground>
      <FlexContainerResponsive flexColumn hasPadding hasBackground>
        <H3>{currentTab?.displayText}</H3>
        <Tabs tabConfigs={tabConfigs({ tab, handleChangeTab })} />
        {tab === 'offices' && <OfficesTab />}
        {tab === 'areas' && <AreasTab />}
        {tab === 'globalSettings' && <GlobalSettingsTab />}
        {tab === 'integrations' && <IntegrationsTab />}
      </FlexContainerResponsive>
    </FlexContainerBasic>
  )
}

export default Offices
