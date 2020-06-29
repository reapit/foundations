import * as React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Tabs, H3, TabConfig, Section } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import DetailedTab from '@/components/ui/developer-analytics/detailed'
import CostExplorerTab from '@/components/ui/developer-analytics/cost-explorer'
import Routes from '@/constants/routes'

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
        history.push(Routes.DEVELOPER_ANALYTICS)
      },
      active: currentTab === AnalyticsTab.DETAILED,
    },
    {
      tabIdentifier: AnalyticsTab.COST_EXPLORER,
      displayText: 'Cost Explorer',
      onTabClick: () => {
        history.push(`${Routes.DEVELOPER_ANALYTICS}/${AnalyticsTab.COST_EXPLORER}`)
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

export const renderTabContent = currentTab => {
  switch (currentTab) {
    case AnalyticsTab.DETAILED:
      return <DetailedTab />
    case AnalyticsTab.COST_EXPLORER:
      return <CostExplorerTab />
    default:
      return <DetailedTab />
  }
}

export const DeveloperAnalyticsPage: React.FC<DeveloperAnalyticsPageProps> = () => {
  const [currentTab, setCurrentTab] = React.useState<AnalyticsTab>(AnalyticsTab.DETAILED)
  const history = useHistory()
  const { activeTab } = useParams()

  React.useEffect(handleUseEffectToSetCurrentTab(activeTab, setCurrentTab), [activeTab])

  return (
    <ErrorBoundary>
      <H3 isHeadingSection>Dashboard</H3>
      <Section>
        <Tabs tabConfigs={tabConfigs({ currentTab, history })} />
      </Section>
      {renderTabContent(currentTab)}
    </ErrorBoundary>
  )
}

export default DeveloperAnalyticsPage
