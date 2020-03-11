import * as React from 'react'
import { H3, FlexContainerBasic, FlexContainerResponsive, TabConfig, Tabs } from '@reapit/elements'
import { useLocation, matchPath, useHistory } from 'react-router-dom'
import { Route } from 'react-router'
import OfficesTab from '@/components/ui/offices-tab'

import AreasTab from '@/components/ui/areas-tab'
import GlobalSettingsTab from '@/components/ui/global-settings-tab'
import IntegrationsTab from '@/components/ui/integration-tab'
import Routes from '@/constants/routes'

type ExtendedTabConfig = TabConfig & { path: string; Component: React.FC }

type GetConfigParams = {
  handleChangeTab: (tabIdentifier: string) => void
  officesUrlPart: string
  currentBrowserUrl: string
}

type GetTabConfigs = (params: GetConfigParams) => ExtendedTabConfig[]

export const getTabConfigs: GetTabConfigs = ({ handleChangeTab, officesUrlPart, currentBrowserUrl }) =>
  [
    {
      tabIdentifier: 'offices',
      displayText: 'Offices',
      path: '',
      Component: OfficesTab,
    },
    {
      tabIdentifier: 'areas',
      displayText: 'Areas',
      path: 'areas',
      Component: AreasTab,
    },
    {
      tabIdentifier: 'globalSettings',
      displayText: 'Global Settings',
      path: 'globalsettings',
      Component: GlobalSettingsTab,
    },
    {
      tabIdentifier: 'integrations',
      displayText: 'Integrations',
      path: 'integrations',
      Component: IntegrationsTab,
    },
  ].map(tabConfig => {
    const path = `${officesUrlPart}/${tabConfig.path}`
    return {
      ...tabConfig,
      onTabClick: () => handleChangeTab(path),
      path,
      active: Boolean(
        matchPath(currentBrowserUrl, {
          path,
          exact: true,
        }),
      ),
    }
  })

export type OfficesProps = {}

export const Offices: React.FC<OfficesProps> = () => {
  const { pathname } = useLocation()
  const history = useHistory()

  const handleChangeTab = React.useCallback(path => {
    history.push(path)
  }, [])

  const tabConfigs = React.useMemo(
    () =>
      getTabConfigs({
        handleChangeTab,
        officesUrlPart: Routes.OFFICES,
        currentBrowserUrl: pathname,
      }),
    [pathname],
  )

  const currentTabConfig = tabConfigs.find(tabConfig => tabConfig.active)

  return (
    <FlexContainerBasic hasPadding hasBackground>
      <FlexContainerResponsive flexColumn hasPadding hasBackground>
        <H3>{currentTabConfig?.displayText}</H3>
        <Tabs tabConfigs={tabConfigs} />
        {tabConfigs.map(({ tabIdentifier, path, Component }) => (
          <Route exact key={tabIdentifier} path={path} component={Component} />
        ))}
      </FlexContainerResponsive>
    </FlexContainerBasic>
  )
}

export default Offices
