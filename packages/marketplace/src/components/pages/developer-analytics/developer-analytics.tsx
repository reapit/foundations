import * as React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Tabs, FlexContainerBasic, FlexContainerResponsive, H3, TabConfig } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import DetailedTab from '@/components/ui/developer-analytics/detailed'
import BillingTab from '@/components/ui/developer-analytics/billing'
import Routes from '@/constants/routes'
import styles from '@/styles/pages/developer-analytics.scss?mod'

export type DeveloperAnalyticsPageProps = {}

export type TabConfigsProps = {
  currentTab: string
  history: any
}

export enum AnalyticsTab {
  DETAILED = 'detailed',
  BILLING = 'billing',
}

export const tabConfigs = ({ currentTab, history }: TabConfigsProps): TabConfig[] => {
  const configs = [
    {
      tabIdentifier: AnalyticsTab.DETAILED,
      displayText: 'DETAILED',
      onTabClick: () => {
        history.push(Routes.DEVELOPER_ANALYTICS)
      },
      active: currentTab === AnalyticsTab.DETAILED,
    },
  ]
  if (window.reapit.config.appEnv !== 'production') {
    configs.push({
      tabIdentifier: AnalyticsTab.BILLING,
      displayText: 'BILLING',
      onTabClick: () => {
        history.push(`${Routes.DEVELOPER_ANALYTICS}/${AnalyticsTab.BILLING}`)
      },
      active: currentTab === AnalyticsTab.BILLING,
    })
  }
  return configs
}

export const handleUseEffectToSetCurrentTab = (activeTab, setCurrentTab) => {
  return () => {
    switch (activeTab) {
      case AnalyticsTab.DETAILED:
        setCurrentTab(AnalyticsTab.DETAILED)
        break
      case AnalyticsTab.BILLING:
        setCurrentTab(AnalyticsTab.BILLING)
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
    case AnalyticsTab.BILLING:
      return <BillingTab />
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
      <FlexContainerBasic hasPadding flexColumn>
        <FlexContainerResponsive flexColumn hasBackground hasPadding className={styles.wrapAnalytics}>
          <H3>Dashboard</H3>
          <div className={styles.tabContainer}>
            <Tabs tabConfigs={tabConfigs({ currentTab, history })} />
          </div>
          <div>{renderTabContent(currentTab)}</div>
        </FlexContainerResponsive>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export default DeveloperAnalyticsPage
