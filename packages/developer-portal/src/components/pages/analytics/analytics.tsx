import * as React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Tabs, H3, TabConfig } from '@reapit/elements-legacy'
import ErrorBoundary from '@/components/hocs/error-boundary'
import DetailedTab from './detailed'
import CostExplorerTab from './cost-explorer'
import Routes from '@/constants/routes'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { AppSummaryModel, AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/utils-react'
import { Loader } from '@reapit/elements'

export type DeveloperAnalyticsPageProps = {}

export type TabConfigsProps = {
  currentTab: string
  history: any
}

export enum AnalyticsTab {
  DETAILED = 'detailed',
  COST_EXPLORER = 'costexplorer',
}

export const tabConfigs = ({ currentTab, history }: TabConfigsProps): TabConfig[] => {
  return [
    {
      tabIdentifier: AnalyticsTab.DETAILED,
      displayText: 'DETAILED',
      onTabClick: () => {
        history.push(Routes.ANALYTICS)
      },
      active: currentTab === AnalyticsTab.DETAILED,
    },
    {
      tabIdentifier: AnalyticsTab.COST_EXPLORER,
      displayText: 'Cost Explorer',
      onTabClick: () => {
        history.push(`${Routes.ANALYTICS}/${AnalyticsTab.COST_EXPLORER}`)
      },
      active: currentTab === AnalyticsTab.COST_EXPLORER,
    },
  ]
}

export const handleUseEffectToSetCurrentTab = (activeTab, setCurrentTab) => {
  return () => {
    switch (activeTab) {
      case AnalyticsTab.DETAILED:
        setCurrentTab(AnalyticsTab.DETAILED)
        break
      case AnalyticsTab.COST_EXPLORER:
        setCurrentTab(AnalyticsTab.COST_EXPLORER)
        break
      default:
        setCurrentTab(AnalyticsTab.DETAILED)
        break
    }
  }
}

export const renderTabContent = (currentTab: AnalyticsTab, apps: AppSummaryModel[]) => {
  switch (currentTab) {
    case AnalyticsTab.DETAILED:
      return <DetailedTab apps={apps} />
    case AnalyticsTab.COST_EXPLORER:
      return <CostExplorerTab apps={apps} />
    default:
      return <DetailedTab apps={apps} />
  }
}

export const DeveloperAnalyticsPage: React.FC<DeveloperAnalyticsPageProps> = () => {
  const [currentTab, setCurrentTab] = React.useState<AnalyticsTab>(AnalyticsTab.DETAILED)
  const history = useHistory()
  const { activeTab } = useParams<{ activeTab: string }>()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const developerId = connectSession?.loginIdentity.developerId

  const [apps, appsLoading] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: { showHiddenApps: 'true', developerId, pageSize: 25 },
    fetchWhenTrue: [developerId],
  })

  React.useEffect(handleUseEffectToSetCurrentTab(activeTab, setCurrentTab), [activeTab])

  return (
    <ErrorBoundary>
      <H3>Dashboard</H3>
      <Tabs tabConfigs={tabConfigs({ currentTab, history })} />
      {appsLoading && <Loader />}
      {apps?.data && renderTabContent(currentTab, apps.data)}
    </ErrorBoundary>
  )
}

export default DeveloperAnalyticsPage
