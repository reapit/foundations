import * as React from 'react'
import { CostCalculatorFormValues } from './cost-calculator-form'
import { EndpointsUsedRange, TierPrice } from './cost-calculator'
import { formatCurrency, formatNumbber } from '@/utils/number-formatter'

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

  const renderEndpointsUsed = () => {
    return bands.map((item, index) => {
      if (index === 0) {
        return <td key={index}>{endpointsUsedRange[endpointsUsed]}</td>
      }
      return <td key={index}></td>
    })
  }

  const renderApiCalls = () => {
    return bands.map((item, index) => {
      if (index === 0) {
        return <td key={index}>{formatNumbber(parseFloat(apiCalls))}</td>
      }
      return <td key={index}></td>
    })
  }

  const renderBand = () => {
    return bands.map((item, index) => {
      return <td key={index}>{formatNumbber(item)}</td>
    })
  }

  const renderBandCostPerCall = () => {
    return bandCostPerCall.map((item, index) => {
      return <td key={index}>{formatCurrency(item, 6)}</td>
    })
  }

  const renderCostPerBand = () => {
    return costPerBand.map((item, index) => {
      return <td key={index}>{formatCurrency(Math.round(item * 100) / 100)}</td>
    })
  }

  return (
    <div className="table-container mt-5">
      <table className="table is-striped is-bordered is-fullwidth">
        <tbody>
          <tr>
            <td>
              <strong>Endpoints Used</strong>
            </td>
            {renderEndpointsUsed()}
          </tr>
          <tr>
            <td>
              <strong>Monthly API calls</strong>
            </td>
            {renderApiCalls()}
          </tr>
          <tr>
            <td>
              <strong>Calls within band (A)</strong>
            </td>
            {renderBand()}
          </tr>
          <tr>
            <td>
              <strong>Band cost per call (B)</strong>
            </td>
            {renderBandCostPerCall()}
          </tr>
          <tr>
            <td>
              <strong>Cost per band (A) x (B)</strong>
            </td>
            {renderCostPerBand()}
          </tr>
        </tbody>
      </table>
      <div className="is-pulled-right is-size-5">
        <strong>Estimated Total monthly cost: {formatCurrency(Math.round(totalMonthlyCost * 100) / 100)}</strong>
      </div>
    </div>
  )
}

export default TotalCostTable
