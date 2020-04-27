import * as React from 'react'
import CostCalculator from './cost-calculator'
import { FlexContainerResponsive, FlexContainerBasic } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import styles from '@/styles/pages/analytics.scss?mod'

export type BillingTabProps = {}

export const BillingTab: React.FC<BillingTabProps> = () => {
  return (
    <ErrorBoundary>
      <FlexContainerBasic hasPadding flexColumn>
        <FlexContainerResponsive flexColumn hasBackground hasPadding className={styles.wrapAnalytics}>
          <CostCalculator />
        </FlexContainerResponsive>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export default BillingTab
