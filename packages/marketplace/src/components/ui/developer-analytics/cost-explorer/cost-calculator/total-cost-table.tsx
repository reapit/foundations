import * as React from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { CostCalculatorFormValues } from './cost-calculator-form'
import { formatCurrency, formatNumber } from '@/utils/number-formatter'
import { Table, Grid, GridItem, H6, H5, Button } from '@reapit/elements'
import useFoundationCostTable, { endpointsUsedRange } from './use-foundation-cost-table'
import styles from '@/styles/pages/developer-analytics.scss?mod'

export type TotalCostTableProps = {
  formValues: CostCalculatorFormValues
}

export const toggleShowTable = (isTableExpanded: boolean, setIsTableExpanded: (isTableExpanded: boolean) => void) => {
  return () => {
    setIsTableExpanded(!isTableExpanded)
  }
}

const TotalCostTable: React.FC<TotalCostTableProps> = ({ formValues: { endpointsUsed, apiCalls } }) => {
  if (!endpointsUsed || !apiCalls) {
    return null
  }

  const [isTableExpanded, setIsTableExpanded] = React.useState(false)

  const { tableColumns, tableData, totalMonthlyCost } = useFoundationCostTable(endpointsUsed, apiCalls)

  return (
    <div className="mt-5">
      <Grid>
        <GridItem className="is-half-desktop has-text-right">
          <H6>{endpointsUsedRange[endpointsUsed]} Endpoints Used</H6>
          <H6>{formatNumber(parseFloat(apiCalls))} Monthly API Calls</H6>
          <H5 className="mt-mt-5">Estimated total monthly cost: {formatCurrency(totalMonthlyCost)}</H5>
          <Button type="button" variant="secondary" onClick={toggleShowTable(isTableExpanded, setIsTableExpanded)}>
            <span>See calculation</span>
            {isTableExpanded ? (
              <FaCaretUp className={styles.seeCalcullationButtonIcon} />
            ) : (
              <FaCaretDown className={styles.seeCalcullationButtonIcon} />
            )}
          </Button>
        </GridItem>
      </Grid>
      {isTableExpanded && (
        <Grid>
          <GridItem>
            <div className="table-container">
              <Table bordered scrollable columns={tableColumns} data={tableData} />
            </div>
          </GridItem>
        </Grid>
      )}
    </div>
  )
}

export default TotalCostTable
