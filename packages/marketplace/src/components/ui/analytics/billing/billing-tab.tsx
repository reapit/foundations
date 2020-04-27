import * as React from 'react'
import CostCalculator from './cost-calculator'
import TransactionHistory from './transaction-history'
import { FlexContainerResponsive, FlexContainerBasic, Grid, GridItem } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import styles from '@/styles/pages/analytics.scss?mod'

export type BillingTabProps = {}

export const BillingTab: React.FC<BillingTabProps> = () => {
  return (
    <ErrorBoundary>
      <FlexContainerBasic hasPadding flexColumn>
        <FlexContainerResponsive flexColumn hasBackground hasPadding className={styles.wrapAnalytics}>
          <Grid isMultiLine className="mt-5">
            <GridItem className="is-half">
              <h1>Render Chart here</h1>
            </GridItem>
            <GridItem className="is-half">
              <TransactionHistory />
            </GridItem>
          </Grid>
          <CostCalculator />
        </FlexContainerResponsive>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export default BillingTab
