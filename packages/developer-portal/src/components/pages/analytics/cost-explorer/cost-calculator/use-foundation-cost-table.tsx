import * as React from 'react'
import { formatNumber, formatCurrency } from '@/utils/number-formatter'

export type EndpointsUsedRange = { [key: string]: string }

export type TierPriceLimit = {
  limit: number
  price: number
}

export type TierPrice = {
  [key: string]: {
    maxPrice: number
    priceRange: TierPriceLimit[]
  }
}

export const endpointsUsedRange: EndpointsUsedRange = {
  tier1: '1-5',
  tier2: '6-10',
  tier3: '11-20',
  tier4: '21-30',
  tier5: '31-40',
  tier6: '41-50',
  tier7: '50+',
}

export const foundationPricing: TierPrice = {
  tier1: {
    maxPrice: 0.001,
    priceRange: [
      {
        limit: 1000,
        price: 0.01,
      },
      {
        limit: 1500,
        price: 0.008,
      },
      {
        limit: 2500,
        price: 0.006,
      },
      {
        limit: 5000,
        price: 0.005,
      },
      {
        limit: 15000,
        price: 0.004,
      },
      {
        limit: 25000,
        price: 0.0025,
      },
    ],
  },
  tier2: {
    maxPrice: 0.0011,
    priceRange: [
      {
        limit: 1000,
        price: 0.011,
      },
      {
        limit: 1500,
        price: 0.0088,
      },
      {
        limit: 2500,
        price: 0.0066,
      },
      {
        limit: 5000,
        price: 0.0055,
      },
      {
        limit: 15000,
        price: 0.0044,
      },
      {
        limit: 25000,
        price: 0.00275,
      },
    ],
  },
  tier3: {
    maxPrice: 0.00125,
    priceRange: [
      {
        limit: 1000,
        price: 0.0125,
      },
      {
        limit: 1500,
        price: 0.01,
      },
      {
        limit: 2500,
        price: 0.0075,
      },
      {
        limit: 5000,
        price: 0.00625,
      },
      {
        limit: 15000,
        price: 0.005,
      },
      {
        limit: 25000,
        price: 0.003125,
      },
    ],
  },
  tier4: {
    maxPrice: 0.00145,
    priceRange: [
      {
        limit: 1000,
        price: 0.0145,
      },
      {
        limit: 1500,
        price: 0.0116,
      },
      {
        limit: 2500,
        price: 0.0087,
      },
      {
        limit: 5000,
        price: 0.00725,
      },
      {
        limit: 15000,
        price: 0.0058,
      },
      {
        limit: 25000,
        price: 0.003625,
      },
    ],
  },
  tier5: {
    maxPrice: 0.0017,
    priceRange: [
      {
        limit: 1000,
        price: 0.017,
      },
      {
        limit: 1500,
        price: 0.0136,
      },
      {
        limit: 2500,
        price: 0.0102,
      },
      {
        limit: 5000,
        price: 0.0085,
      },
      {
        limit: 15000,
        price: 0.0068,
      },
      {
        limit: 25000,
        price: 0.00425,
      },
    ],
  },
  tier6: {
    maxPrice: 0.002,
    priceRange: [
      {
        limit: 1000,
        price: 0.02,
      },
      {
        limit: 1500,
        price: 0.016,
      },
      {
        limit: 2500,
        price: 0.012,
      },
      {
        limit: 5000,
        price: 0.01,
      },
      {
        limit: 15000,
        price: 0.008,
      },
      {
        limit: 25000,
        price: 0.005,
      },
    ],
  },
  tier7: {
    maxPrice: 0.00235,
    priceRange: [
      {
        limit: 1000,
        price: 0.0235,
      },
      {
        limit: 1500,
        price: 0.0188,
      },
      {
        limit: 2500,
        price: 0.0141,
      },
      {
        limit: 5000,
        price: 0.01175,
      },
      {
        limit: 15000,
        price: 0.0094,
      },
      {
        limit: 25000,
        price: 0.005875,
      },
    ],
  },
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

export const prepareTableColumns = (totalMonthlyCost: number) => {
  return () => {
    return [
      {
        Header: 'Number of API Calls',
        accessor: (row) => {
          return formatNumber(row.numberOfApiCalls)
        },
      },
      {
        Header: 'Cost Per API Call',
        accessor: (row) => {
          return formatCurrency(row.costPerApiCall, 6)
        },
        Footer: 'Estimated total monthly cost',
      },
      {
        Header: 'Total Cost',
        accessor: (row) => {
          return formatCurrency(row.totalCost)
        },
        Footer: () => {
          return formatCurrency(totalMonthlyCost)
        },
      },
    ]
  }
}

const useFoundationCostTable = (endpointsUsed: string, apiCalls: string) => {
  const { tableData, totalMonthlyCost } = React.useMemo(prepareData(endpointsUsed, apiCalls, foundationPricing), [
    endpointsUsed,
    apiCalls,
    foundationPricing,
  ])
  const tableColumns = React.useMemo(prepareTableColumns(totalMonthlyCost), [totalMonthlyCost])
  return {
    tableColumns,
    tableData,
    totalMonthlyCost,
  }
}

export default useFoundationCostTable
