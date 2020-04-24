import * as React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Tabs, FlexContainerBasic, FlexContainerResponsive, H3, TabConfig } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import DetailedTab from '../ui/analytics/detailed/detailed-tab'
import BillingTab from '../ui/analytics/billing/billing-tab'
import Routes from '@/constants/routes'
import styles from '@/styles/pages/analytics.scss?mod'

export type AnalyticsPageProps = {}

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
  if (process.env.NODE_ENV === 'development') {
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

export const renenderTabContent = currentTab => {
  switch (currentTab) {
    case AnalyticsTab.DETAILED:
      return <DetailedTab />
    case AnalyticsTab.BILLING:
      return <BillingTab />
    default:
      return <DetailedTab />
  }
}

export const AnalyticsPage: React.FC<AnalyticsPageProps> = () => {
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
          <div>{renenderTabContent(currentTab)}</div>
        </FlexContainerResponsive>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export default AnalyticsPage
