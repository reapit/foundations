import * as React from 'react'
import TransactionHistory from './transaction-history'
import { Grid, GridItem } from '@reapit/elements-legacy'
import ErrorBoundary from '@/components/hocs/error-boundary'
import ServiceChart from './service-chart'
import CostExplorer from './cost-explorer-component'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'

export type CostExplorerTabProps = {
  apps: AppSummaryModel[]
}

export const CostExplorerTab: React.FC<CostExplorerTabProps> = ({ apps }) => {
  return (
    <ErrorBoundary>
      <Grid isMultiLine>
        <GridItem className="is-half">
          <ServiceChart />
        </GridItem>
        <GridItem className="is-half">
          <TransactionHistory apps={apps} />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <CostExplorer />
        </GridItem>
      </Grid>
    </ErrorBoundary>
  )
}

export default CostExplorerTab
