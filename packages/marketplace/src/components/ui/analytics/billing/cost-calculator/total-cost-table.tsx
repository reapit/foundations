import * as React from 'react'
import { CostCalculatorFormValues } from './cost-calculator-form'
import { EndpointsUsedRange, TierPrice } from './cost-calculator'
import { formatCurrency, formatNumber } from '@/utils/number-formatter'

export type TotalCostTableProps = {
  formValues: CostCalculatorFormValues
  endpointsUsedRange: EndpointsUsedRange
  foundationPricing: TierPrice
}

export type TotalCostTableData = {
  bands: number[]
  bandCostPerCall: number[]
  costPerBand: number[]
  totalMonthlyCost: number
}

export const prepareData = (
  endpointsUsed: string,
  apiCalls: string,
  foundationPricing: TierPrice,
): TotalCostTableData => {
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

  return {
    bands,
    bandCostPerCall,
    costPerBand,
    totalMonthlyCost,
  }
}

export const renderEndpointsUsed = (bands, endpointsUsedRange, endpointsUsed) => {
  return bands.map((_: any, index) => {
    if (index === 0) {
      return <td key={index}>{endpointsUsedRange[endpointsUsed]}</td>
    }
    return <td key={index}></td>
  })
}

export const renderApiCalls = (bands, apiCalls) => {
  return bands.map((_: any, index) => {
    if (index === 0) {
      return <td key={index}>{formatNumber(parseFloat(apiCalls))}</td>
    }
    return <td key={index}></td>
  })
}

export const renderBand = bands => {
  return bands.map((item, index) => {
    return <td key={index}>{formatNumber(item)}</td>
  })
}

export const renderBandCostPerCall = bandCostPerCall => {
  return bandCostPerCall.map((item, index) => {
    return <td key={index}>{formatCurrency(item, 6)}</td>
  })
}

export const renderCostPerBand = costPerBand => {
  return costPerBand.map((item, index) => {
    return <td key={index}>{formatCurrency(item)}</td>
  })
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

  return (
    <div className="table-container mt-5">
      <table className="table is-striped is-bordered is-fullwidth">
        <tbody>
          <tr>
            <td>
              <strong>Endpoints Used</strong>
            </td>
            {renderEndpointsUsed(bands, endpointsUsedRange, endpointsUsed)}
          </tr>
          <tr>
            <td>
              <strong>Monthly API calls</strong>
            </td>
            {renderApiCalls(bands, apiCalls)}
          </tr>
          <tr>
            <td>
              <strong>Calls within band (A)</strong>
            </td>
            {renderBand(bands)}
          </tr>
          <tr>
            <td>
              <strong>Band cost per call (B)</strong>
            </td>
            {renderBandCostPerCall(bandCostPerCall)}
          </tr>
          <tr>
            <td>
              <strong>Cost per band (A) x (B)</strong>
            </td>
            {renderCostPerBand(costPerBand)}
          </tr>
        </tbody>
      </table>
      <div className="is-pulled-right is-size-5">
        <strong>Estimated Total monthly cost: {formatCurrency(totalMonthlyCost)}</strong>
      </div>
    </div>
  )
}

export default TotalCostTable
