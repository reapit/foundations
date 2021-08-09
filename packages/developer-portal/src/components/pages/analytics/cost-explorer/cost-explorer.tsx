import * as React from 'react'
import CostCalculator from './cost-calculator'
import TransactionHistory from './transaction-history'
import { Grid, GridItem } from '@reapit/elements-legacy'
import ErrorBoundary from '@/components/hocs/error-boundary'
import ServiceChart from './service-chart'
import CostExplorer from './cost-explorer-component'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { selectIsCustomer } from '../../../../selector/auth'

export type CostExplorerTabProps = {}

export const CostExplorerTab: React.FC<CostExplorerTabProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const isCustomerUser = selectIsCustomer(connectSession)
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
      {isCustomerUser && <CostCalculator />}
    </ErrorBoundary>
  )
}

export default CostExplorerTab
