import * as React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Tabs, FlexContainerBasic, FlexContainerResponsive, H3, TabConfig } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import DetailedTab from '@/components/ui/developer-analytics/detailed'
import BillingTab from '@/components/ui/developer-analytics/billing'
import Routes from '@/constants/routes'
import styles from '@/styles/pages/developer-analytics.scss?mod'

export type DeveloperAnalyticsPageProps = {}

export type TabConfigsProps = {
  currentUrl: string
  history: any
}

export enum AnalyticsTab {
  DETAILED = 'detailed',
  BILLING = 'billing',
}

export const tabConfigs = ({ currentUrl, history }: TabConfigsProps): TabConfig[] => {
  const configs = [
    {
      tabIdentifier: AnalyticsTab.DETAILED,
      displayText: 'DETAILED',
      onTabClick: () => {
        history.push(Routes.DEVELOPER_ANALYTICS)
      },
      active: currentUrl === Routes.DEVELOPER_ANALYTICS,
    },
  ]
  if (window.reapit.config.appEnv !== 'production') {
    configs.push({
      tabIdentifier: AnalyticsTab.BILLING,
      displayText: 'BILLING',
      onTabClick: () => {
        history.push(Routes.DEVELOPER_ANALYTICS_BILLING_TAB)
      },
      active: currentUrl === Routes.DEVELOPER_ANALYTICS_BILLING_TAB,
    })
  }
  return configs
}

/**
 * using route instead switch case
 */
export const renderTabContent = currentUrl => {
  switch (currentUrl) {
    case Routes.DEVELOPER_ANALYTICS:
      return <DetailedTab />
    case Routes.DEVELOPER_ANALYTICS_BILLING_TAB:
      return <BillingTab />
    default:
      return <DetailedTab />
  }
}

export const DeveloperAnalyticsPage: React.FC<DeveloperAnalyticsPageProps> = () => {
  const history = useHistory()
  const { url: currentUrl } = useRouteMatch()

  return (
    <ErrorBoundary>
      <FlexContainerBasic hasPadding flexColumn>
        <FlexContainerResponsive flexColumn hasBackground hasPadding className={styles.wrapAnalytics}>
          <H3>Dashboard</H3>
          <div className={styles.tabContainer}>
            <Tabs tabConfigs={tabConfigs({ currentUrl, history })} />
          </div>
          <div>{renderTabContent(currentUrl)}</div>
        </FlexContainerResponsive>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export default DeveloperAnalyticsPage
