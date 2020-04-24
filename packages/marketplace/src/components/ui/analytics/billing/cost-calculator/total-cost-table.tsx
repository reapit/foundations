import * as React from 'react'
import { CostCalculatorFormValues } from './cost-calculator-form'
import { EndpointsUsedRange, TierPrice, TierPriceLimit } from './cost-calculator'
import { Grid, GridItem } from '@reapit/elements'

type TotalCostTableProps = {
  formValues: CostCalculatorFormValues
  endpointsUsedRange: EndpointsUsedRange
  foundationPricing: TierPrice
}

type TableResult = {
  bands: number[]
  bandCostPerCall: number[]
  costPerBand: number[]
  totalMonthlyCost: number
}

export const prepareData = (endpointsUsed: string, apiCalls: string, foundationPricing: TierPrice): TableResult => {
  const bands: number[] = []
  const bandCostPerCall: number[] = []
  let totalMonthlyCost: number = 0

  const data = foundationPricing[endpointsUsed]
  let remaining = parseFloat(apiCalls)
  const { priceRange, maxPrice } = data
  for (let i = 0; i < priceRange.length; i++) {
    const element = priceRange[i]
    if (remaining <= element.limit) {
      bands.push(remaining)
      bandCostPerCall.push(element.price)
      totalMonthlyCost += remaining * element.price
      remaining = 0
      break
    } else {
      bands.push(element.limit)
      bandCostPerCall.push(element.price)
      totalMonthlyCost += element.limit * element.price
      remaining -= element.limit
    }
  }

  if (remaining > 0) {
    bands.push(remaining)
    bandCostPerCall.push(maxPrice)
    totalMonthlyCost += maxPrice * remaining
  }

  const costPerBand = bandCostPerCall.map((item, index) => {
    return item * bands[index]
  })

  return {
    bands,
    bandCostPerCall,
    costPerBand,
    totalMonthlyCost,
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

  const { bands, bandCostPerCall, costPerBand, totalMonthlyCost } = prepareData(
    endpointsUsed,
    apiCalls,
    foundationPricing,
  )

  const renderBand = () => {
    return bands.map((item, index) => {
      return <GridItem key={index}>{item}</GridItem>
    })
  }

  const renderBandCostPerCall = () => {
    return bandCostPerCall.map((item, index) => {
      return <GridItem key={index}>${item.toFixed(6)}</GridItem>
    })
  }

  const renderCostPerBand = () => {
    return costPerBand.map((item, index) => {
      return <GridItem key={index}>${Math.round(item * 100) / 100}</GridItem>
    })
  }

  return (
    <div>
      <Grid>
        <GridItem className="is-3 has-text-right">Endpoints Used</GridItem>
        <GridItem>{endpointsUsedRange[endpointsUsed]}</GridItem>
      </Grid>
      <Grid>
        <GridItem className="is-3 has-text-right">Monthly API calls</GridItem>
        <GridItem>{apiCalls}</GridItem>
      </Grid>
      <Grid>
        <GridItem className="is-3 has-text-right">Calls within band (A)</GridItem>
        {renderBand()}
      </Grid>
      <Grid>
        <GridItem className="is-3 has-text-right">Band cost per call (B)</GridItem>
        {renderBandCostPerCall()}
      </Grid>
      <Grid>
        <GridItem className="is-3 has-text-right">Cost per band (A) x (B)</GridItem>
        {renderCostPerBand()}
      </Grid>
      <Grid>
        <GridItem className="is-3 has-text-right">
          <strong>Total monthly cost</strong>
        </GridItem>
        <GridItem>
          <strong>${Math.round(totalMonthlyCost * 100) / 100}</strong>
        </GridItem>
      </Grid>
    </div>
  )
}

export default TotalCostTable
