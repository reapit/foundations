import * as React from 'react'
// Removing as part of https://github.com/reapit/foundations/issues/4692 may need to re-instate later
// import CostCalculator from './cost-calculator'
import TransactionHistory from './transaction-history'
import { Grid, GridItem } from '@reapit/elements-legacy'
import ErrorBoundary from '@/components/hocs/error-boundary'
import ServiceChart from './service-chart'
import CostExplorer from './cost-explorer-component'

export type CostExplorerTabProps = {}

export const CostExplorerTab: React.FC<CostExplorerTabProps> = () => {
  return (
    <ErrorBoundary>
      <Grid isMultiLine>
        <GridItem className="is-half">
          <ServiceChart />
        </GridItem>
        <GridItem className="is-half">
          <TransactionHistory />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <CostExplorer />
        </GridItem>
      </Grid>
      {/* <CostCalculator /> */}
    </ErrorBoundary>
  )
}

export default CostExplorerTab
