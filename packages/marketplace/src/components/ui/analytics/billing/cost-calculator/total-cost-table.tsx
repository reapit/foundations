import * as React from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'
import { CostCalculatorFormValues } from './cost-calculator-form'
import { EndpointsUsedRange, TierPrice } from './cost-calculator'
import { formatCurrency, formatNumber } from '@/utils/number-formatter'
import { Table, Grid, GridItem, H6, H4, Button } from '@reapit/elements'
import styles from '@/styles/pages/analytics.scss?mod'

export type TotalCostTableProps = {
  formValues: CostCalculatorFormValues
  endpointsUsedRange: EndpointsUsedRange
  foundationPricing: TierPrice
}

export type TableRow = {
  numberOfApiCalls: number
  costPerApiCall: number
  totalCost: number
}

export type TotalCostTableData = {
  tableData: TableRow[]
  totalMonthlyCost: number
}

export const prepareData = (endpointsUsed: string, apiCalls: string, foundationPricing: TierPrice) => {
  return (): TotalCostTableData => {
    const bands: number[] = []
    const bandCostPerCall: number[] = []
    let totalMonthlyCost: number = 0

    let remainingApiCalls = parseFloat(apiCalls)
    const { priceRange, maxPrice } = foundationPricing[endpointsUsed]

    for (const tierPriceLimit of priceRange) {
      const { limit, price } = tierPriceLimit
      bandCostPerCall.push(price)

      if (remainingApiCalls > limit) {
        bands.push(limit)
        totalMonthlyCost += limit * price
        remainingApiCalls -= limit
      } else {
        bands.push(remainingApiCalls)
        totalMonthlyCost += remainingApiCalls * price
        remainingApiCalls = 0
        break
      }
    }

    if (remainingApiCalls > 0) {
      bands.push(remainingApiCalls)
      bandCostPerCall.push(maxPrice)
      totalMonthlyCost += maxPrice * remainingApiCalls
    }

    const costPerBand = bandCostPerCall.map((item, index) => {
      return item * bands[index]
    })

    const tableData = bands.map((item, index) => {
      return {
        numberOfApiCalls: item,
        costPerApiCall: bandCostPerCall[index],
        totalCost: costPerBand[index],
      }
    })
    return {
      tableData,
      totalMonthlyCost,
    }
  }
}

export const prepareTableColumns = totalMonthlyCost => {
  return () => {
    return [
      {
        Header: 'Number of API Calls',
        accessor: row => {
          return formatNumber(row.numberOfApiCalls)
        },
      },
      {
        Header: 'Cost Per API Call',
        accessor: row => {
          return formatCurrency(row.costPerApiCall, 6)
        },
        Footer: 'Estimated total monthly cost',
      },
      {
        Header: 'Total Cost',
        accessor: row => {
          return formatCurrency(row.totalCost)
        },
        Footer: () => {
          return formatCurrency(totalMonthlyCost)
        },
      },
    ]
  }
}

export const toggleShowTable = (isTableExpanded, setIsTableExpanded) => {
  return () => {
    setIsTableExpanded(!isTableExpanded)
  }
}

const TotalCostTable: React.FC<TotalCostTableProps> = ({
  formValues: { endpointsUsed, apiCalls },
  endpointsUsedRange,
  foundationPricing,
}) => {
  if (!endpointsUsed || !apiCalls) {
    return null
  }

  const [isTableExpanded, setIsTableExpanded] = React.useState(false)
  const { tableData, totalMonthlyCost } = React.useMemo(prepareData(endpointsUsed, apiCalls, foundationPricing), [
    endpointsUsed,
    apiCalls,
    foundationPricing,
  ])
  const tableColumns = React.useMemo(prepareTableColumns(totalMonthlyCost), [totalMonthlyCost])

  return (
    <div className="mt-5">
      <Grid>
        <GridItem className="is-half-desktop has-text-right">
          <H6>{endpointsUsedRange[endpointsUsed]} Endoints Used</H6>
          <H6>{formatNumber(parseFloat(apiCalls))} Monthly API Calls</H6>
          <H4 className="mt-mt-5">Estimated total monthly cost: {formatCurrency(totalMonthlyCost)}</H4>
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
